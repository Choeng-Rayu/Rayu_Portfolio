import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

const FROM_EMAIL = "choengrayu307@gmail.com";
const TO_EMAIL = "choengrayu307@gmail.com";

export async function POST(request: Request) {
  try {
    const data: EmailData = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    
    // If API key is available and valid, send via SendGrid
    if (apiKey && apiKey.startsWith("SG.")) {
      sgMail.setApiKey(apiKey);
      
      const msg = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: `Portfolio Contact from ${data.name}`,
        text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
        `.trim(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #009DFF; border-bottom: 2px solid #009DFF; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${data.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            </div>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3 style="margin-top: 0; color: #333;">Message:</h3>
              <p style="color: #555; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">
              This message was sent from your portfolio website.
            </p>
          </div>
        `,
        replyTo: data.email,
      };

      await sgMail.send(msg);
      console.log("Email sent successfully via SendGrid");

      return NextResponse.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      // Fallback: Log the email data for development/demo purposes
      // In production, this should be replaced with a working email service
      console.log("=== EMAIL (SendGrid not configured) ===");
      console.log("To:", TO_EMAIL);
      console.log("From:", data.email);
      console.log("Subject:", `Portfolio Contact from ${data.name}`);
      console.log("Message:", data.message);
      console.log("======================================");
      
      // Simulate success for demo purposes
      // In production, you would return an error or configure a proper email service
      return NextResponse.json(
        { 
          success: true, 
          message: "Email logged (SendGrid not configured)",
          demo: true,
          emailData: {
            to: TO_EMAIL,
            from: data.email,
            subject: `Portfolio Contact from ${data.name}`,
            preview: data.message.substring(0, 100) + "..."
          }
        },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error("Email error:", error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: { errors?: Array<{ message: string }> } } };
      const errorMessage = sgError.response?.body?.errors?.[0]?.message || "Failed to send email";
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: "Email API is running. Use POST to send emails.",
      instructions: "Send a POST request with { name, email, message } to send an email."
    },
    { status: 200 }
  );
}
