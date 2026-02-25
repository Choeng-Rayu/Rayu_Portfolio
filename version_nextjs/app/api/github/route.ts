// Next.js Route Handler: /api/github
// Fetches Choeng-Rayu's public GitHub data with 1-hour revalidation cache.

import { NextResponse } from 'next/server';
import type { GitHubData, GitHubProfile, GitHubRepo } from '@/app/data/github';
import { githubConfig } from '@/app/data/github';

const GITHUB_API = 'https://api.github.com';
const USERNAME = githubConfig.username;

const fetchOptions: RequestInit = {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'rayu-portfolio',
  },
  next: { revalidate: 3600 }, // Cache for 1 hour
};

export async function GET(): Promise<NextResponse> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`, fetchOptions),
      fetch(`${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=50`, fetchOptions),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: profile=${profileRes.status}, repos=${reposRes.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawProfile: any = await profileRes.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawRepos: any[] = await reposRes.json();

    const profile: GitHubProfile = {
      login: rawProfile.login,
      name: rawProfile.name || rawProfile.login,
      avatarUrl: rawProfile.avatar_url,
      bio: rawProfile.bio,
      blog: rawProfile.blog || null,
      publicRepos: rawProfile.public_repos,
      followers: rawProfile.followers,
      following: rawProfile.following,
      htmlUrl: rawProfile.html_url,
    };

    const repos: GitHubRepo[] = rawRepos
      .filter((r) => !r.fork) // exclude forks by default
      .map((r) => ({
        name: r.name,
        description: r.description,
        htmlUrl: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
      }));

    const data: GitHubData = { profile, repos };
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    console.error('[api/github] Failed to fetch GitHub data:', err);
    // Return static fallback so the UI doesn't break
    const fallback: GitHubData = {
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
    return NextResponse.json(fallback, { status: 200 });
  }
}
