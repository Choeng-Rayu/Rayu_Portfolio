// GitHub Profile Data
// Used by the GitHub API route and GitHubStats section

export const githubConfig = {
  username: "Choeng-Rayu",
  profileUrl: "https://github.com/Choeng-Rayu",
  avatarUrl: "https://avatars.githubusercontent.com/u/185312787?v=4",
  bio: "Nothing is Perfect but Nothing is impossible.",
  website: "https://rayu-choeng.tech",
  // Static fallback stats (updated from GitHub API on 2026-02-25)
  stats: {
    publicRepos: 55,
    followers: 12,
    following: 11,
  },
};

// Maps portfolio project IDs to their exact GitHub repo names
// Used to cross-reference live star/fork counts in project cards
export const projectGitHubRepos: Record<number, string> = {
  1: "DasTern",           // DasTern – Smart Prescription OCR
  2: "Finwise2",          // Finwise.space
  3: "RayuOS",            // RayuOS (Mini OS)
  4: "cyber_project_T1Y3", // Cyber Security Project
  5: "DerLg-Startup",     // DerLg – Tour Booking
  6: "MathBot_Python",    // Math Telegram Bot (fallback to fucntion-solving-telegram-bot)
  7: "AlarmBot",          // Alarm Bot
  8: "CoffeeHybrid-Year2", // Coffee Ordering System
};

// Featured repos shown in the GitHubStats section
// Key repos worth highlighting with live stats
export const featuredRepoNames = [
  "DasTern",
  "Finwise2",
  "DerLg-Startup",
  "CoffeeHybrid-Year2",
  "AlarmBot",
  "-bakong_js",
  "DeepSeekAPITelegramBot",
  "E-Commerce-java-new",
];

export interface GitHubRepo {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  blog: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
}
