// Client-side utility for fetching GitHub data from our API route.
// Used by components (GitHubStats, Projects) to get live repo stats.

import type { GitHubData, GitHubRepo } from '@/app/data/github';
import { githubConfig } from '@/app/data/github';

let cachedData: GitHubData | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes client-side cache

export async function getGitHubData(): Promise<GitHubData> {
  const now = Date.now();
  if (cachedData && now - cacheTime < CACHE_TTL) {
    return cachedData;
  }

  try {
    const res = await fetch('/api/github');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: GitHubData = await res.json();
    cachedData = data;
    cacheTime = now;
    return data;
  } catch (err) {
    console.error('[lib/github] Failed:', err);
    // Return a minimal fallback so components don't crash
    return {
      profile: {
        login: githubConfig.username,
        name: 'Choeng Rayu',
        avatarUrl: githubConfig.avatarUrl,
        bio: githubConfig.bio,
        blog: githubConfig.website,
        publicRepos: githubConfig.stats.publicRepos,
        followers: githubConfig.stats.followers,
        following: githubConfig.stats.following,
        htmlUrl: githubConfig.profileUrl,
      },
      repos: [],
    };
  }
}

/**
 * Given a repo name, find its stats from the fetched repos array.
 */
export function findRepo(repos: GitHubRepo[], repoName: string): GitHubRepo | undefined {
  if (!repoName) return undefined;
  const lower = repoName.toLowerCase();
  return repos.find((r) => r.name.toLowerCase() === lower);
}
