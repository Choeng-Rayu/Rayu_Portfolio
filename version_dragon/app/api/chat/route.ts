import { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  message: string;
  history: ChatMessage[];
}

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const stream = true;

// Updated to faster model with reasonable limits
const MODEL = "google/gemma-2-27b-it";
const MAX_TOKENS = 1024;
const TIMEOUT_MS = 60000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const SYSTEM_PROMPT = `You are an AI assistant representing Rayu Choeng, a Full Stack Developer & Software Engineer from Cambodia.

About Rayu:
- Name: Rayu Choeng
- Role: Full Stack Developer & Software Engineer
- Education: Year 3 Computer Science at Cambodia Academy of Digital Technology (CADT)
- Scholarship: Techo Digital Talent Scholarship

Technical Skills:
- Frontend: JavaScript, React, Three.js, Framer Motion, HTML5, CSS3, Tailwind CSS, TypeScript
- Backend & Database: Node.js, MongoDB, Express, Firebase
- Mobile: Flutter
- Other Languages: Java, C++
- Tools: Git

Certifications:
- CISCO IT Essentials
- NICC TechTourism Ignite

Experience:
- Math Tutor
- Khoding-Hero Volunteer Team Leader

Contact Information:
- Email: choengrayu307@gmail.com
- GitHub: github.com/Choeng-Rayu

Profile: "Hands-on software engineering student driven by curiosity, discipline, and purpose"

Instructions:
1. Answer questions about Rayu's skills, experience, education, and background as if you are representing him
2. Be professional, friendly, and helpful
3. If asked about projects or work samples, encourage visitors to explore the portfolio website
4. For questions you cannot answer about Rayu, suggest contacting him directly via email or GitHub
5. Keep responses concise but informative`;

// Helper function to delay for retry
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get NVIDIA-specific error message
const getNvidiaErrorMessage = (error: AxiosError): { message: string; statusCode: number } => {
  const response = error.response;
  const status = response?.status;
  const errorData = response?.data as { error?: { message?: string; code?: string } };
  const errorCode = errorData?.error?.code;
  const errorMessage = errorData?.error?.message;

  // Handle specific NVIDIA API error codes
  if (errorCode === "rate_limit_exceeded" || status === 429) {
    return {
      message: "The AI service is currently busy. Please wait a moment and try again.",
      statusCode: 429
    };
  }

  if (errorCode === "insufficient_quota" || status === 402) {
    return {
      message: "Service temporarily unavailable. Please contact Rayu directly at choengrayu307@gmail.com",
      statusCode: 503
    };
  }

  if (errorCode === "invalid_api_key" || status === 401) {
    return {
      message: "Service configuration error. Please try again later or contact Rayu directly.",
      statusCode: 500
    };
  }

  if (status === 503 || status === 502) {
    return {
      message: "The AI service is temporarily unavailable. Please try again in a moment or email Rayu at choengrayu307@gmail.com",
      statusCode: 503
    };
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return {
      message: "The request took too long. The AI service may be experiencing high load. Please try again or contact Rayu directly at choengrayu307@gmail.com",
      statusCode: 504
    };
  }

  if (status && status >= 500) {
    return {
      message: `The AI service encountered an error. Please try again or contact Rayu directly at choengrayu307@gmail.com`,
      statusCode: 503
    };
  }

  return {
    message: errorMessage || error.message || "An unexpected error occurred",
    statusCode: status || 500
  };
};

// Helper function to make API request with retry logic
const makeRequestWithRetry = async (payload: object, headers: object): Promise<any> => {
  let lastError: AxiosError | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const apiResponse = await axios.post(invokeUrl, payload, {
        headers: headers,
        responseType: stream ? 'stream' : 'json',
        timeout: TIMEOUT_MS,
      });

      return apiResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        lastError = error;

        // Don't retry on client errors (4xx) except for 429 (rate limit)
        const status = error.response?.status;
        if (status && status >= 400 && status < 500 && status !== 429) {
          throw error;
        }

        // Don't retry on the last attempt
        if (attempt === MAX_RETRIES - 1) {
          throw error;
        }

        // Calculate exponential backoff delay
        const backoffDelay = RETRY_DELAY_MS * Math.pow(2, attempt);
        console.log(`Request failed (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${backoffDelay}ms...`);
        await delay(backoffDelay);
      } else {
        throw error;
      }
    }
  }

  throw lastError || new Error("Request failed after retries");
};

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { message, history } = body;

    // Validate request body
    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'message' field" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!process.env.NVIDIA_API_KEY) {
      console.error("NVIDIA_API_KEY is not configured");
      return new Response(
        JSON.stringify({
          error: "AI service is not configured. Please contact Rayu directly at choengrayu307@gmail.com"
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Build conversation context from history
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Add chat history
    if (history && Array.isArray(history) && history.length > 0) {
      messages.push(...history);
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    const headers = {
      "Authorization": "Bearer " + process.env.NVIDIA_API_KEY,
      "Accept": stream ? "text/event-stream" : "application/json"
    };

    const payload = {
      "model": MODEL,
      "messages": messages,
      "max_tokens": MAX_TOKENS,
      "temperature": 1.00,
      "top_p": 0.95,
      "stream": stream,
    };

    // Make request with retry logic
    const apiResponse = await makeRequestWithRetry(payload, headers);

    // Create a readable stream to pipe axios response to client
    const responseStream = new ReadableStream({
      async start(controller) {
        const responseStream = apiResponse.data;
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        responseStream.on('data', (chunk: Buffer) => {
          const text = decoder.decode(chunk);
          // Forward the SSE data directly to client
          controller.enqueue(encoder.encode(text));
        });

        responseStream.on('end', () => {
          controller.close();
        });

        responseStream.on('error', (error: Error) => {
          console.error("Stream error:", error);
          controller.error(error);
        });
      },
    });

    // Return streaming response
    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("Chat API error:", error);

    let errorMessage = "An unexpected error occurred. Please try again or contact Rayu directly at choengrayu307@gmail.com";
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      const { message, statusCode: code } = getNvidiaErrorMessage(error);
      errorMessage = message;
      statusCode = code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
