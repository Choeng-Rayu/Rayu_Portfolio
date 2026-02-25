// Chatbot Utility Functions — smarter pattern + scored intent matching

import { Intent, ChatAction } from './types';
import { intents, projectPatterns } from './intents';
import { projects } from '../../data/portfolio';

/**
 * Detect intent from user message using pattern + keyword scoring
 */
export function detectIntent(message: string): Intent | null {
  const lower = message.toLowerCase().trim();
  let bestMatch: Intent | null = null;
  let highestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const pattern of intent.patterns) {
      if (typeof pattern === 'string') {
        // String patterns: check for full phrase inclusion
        const keyword = pattern.toLowerCase();
        if (lower === keyword) {
          score += 10; // exact match
        } else if (lower.includes(keyword)) {
          // Longer phrases rank higher
          score += keyword.split(' ').length * 2;
        }
      } else {
        // RegExp patterns — always take priority if matched
        if (pattern.test(message)) {
          score += 15;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  // Minimum threshold to accept a match
  return highestScore >= 2 ? bestMatch : null;
}

/**
 * Find specific project being asked about
 */
export function detectProjectQuery(message: string): typeof projects[0] | null {
  for (const { pattern, projectTitle } of projectPatterns) {
    if (pattern.test(message)) {
      return projects.find(p => p.title.toLowerCase().includes(projectTitle.toLowerCase())) || null;
    }
  }
  return null;
}

/**
 * Generate a rich response for a specific project
 */
export function generateProjectResponse(project: typeof projects[0]): { content: string; actions: ChatAction[] } {
  const badge = project.featured ? ' ⭐ Featured' : '';
  const content = `**${project.title}**${badge}

${project.description}

🏷️ **Technologies:** ${project.tags.join(', ')}
📂 **Category:** ${project.category}${project.demoLink ? '\n🌐 **Live at:** ' + project.demoLink : ''}`;

  const actions: ChatAction[] = [];
  if (project.codeLink) {
    actions.push({ type: 'link', label: '🐙 View Code on GitHub', url: project.codeLink, icon: 'github' });
  }
  if (project.demoLink) {
    actions.push({ type: 'link', label: '🌐 Live Demo', url: project.demoLink, icon: 'link' });
  }
  return { content, actions };
}

/**
 * Build a live GitHub response from API data
 */
export function buildGitHubResponse(data: { profile: any; repos: any[] }): { content: string; actions: ChatAction[] } {
  const { profile, repos } = data;
  const totalStars = repos.reduce((s: number, r: any) => s + (r.stars ?? 0), 0);
  const languages = [...new Set(repos.map((r: any) => r.language).filter(Boolean))].slice(0, 6);
  const top = repos.sort((a: any, b: any) => (b.stars ?? 0) - (a.stars ?? 0)).slice(0, 5);

  const topList = top
    .map((r: any) => `• **${r.name}** — ${r.description ? r.description.slice(0, 60) + '…' : 'No description'} (⭐ ${r.stars ?? 0})`)
    .join('\n');

  return {
    content: `Here's Rayu's live GitHub activity:

🐙 **Profile:** github.com/Choeng-Rayu
📦 **Public Repos:** ${profile?.publicRepos ?? repos.length}
👥 **Followers:** ${profile?.followers ?? '–'}
⭐ **Total Stars:** ${totalStars}
💬 **Languages:** ${languages.join(', ')}

**Top Repositories:**
${topList}`,
    actions: [
      { type: 'link', label: '🐙 Visit GitHub Profile', url: 'https://github.com/Choeng-Rayu', icon: 'github' },
    ],
  };
}

/**
 * Get a random element from an array
 */
export function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}
