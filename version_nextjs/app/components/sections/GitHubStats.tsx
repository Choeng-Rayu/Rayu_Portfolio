'use client';

import { useState, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { getGitHubData } from '../../lib/github';
import { githubConfig, featuredRepoNames } from '../../data/github';
import type { GitHubData, GitHubRepo } from '../../data/github';

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Dart: '#00B4AB',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
};

function StatCard({ value, label, icon }: { value: number | string; label: string; icon: React.ReactNode }) {
  return (
    <div className="gh-stat-card">
      <div className="gh-stat-icon">{icon}</div>
      <div className="gh-stat-value">{value}</div>
      <div className="gh-stat-label">{label}</div>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#8b949e') : '#8b949e';
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="gh-repo-card"
    >
      <div className="gh-repo-header">
        <svg className="gh-repo-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" opacity="0" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        <span className="gh-repo-name">{repo.name}</span>
      </div>
      {repo.description && (
        <p className="gh-repo-desc">{repo.description}</p>
      )}
      <div className="gh-repo-footer">
        {repo.language && (
          <span className="gh-repo-lang">
            <span className="gh-lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="gh-repo-stat">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 .587l3.668 7.431L24 9.279l-6 5.849 1.416 8.265L12 18.897l-7.416 4.496L6 15.128 0 9.279l8.332-1.261L12 .587z" />
          </svg>
          {repo.stars}
        </span>
        <span className="gh-repo-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
            <path d="M6 9v2a3 3 0 003 3h6a3 3 0 003-3V9" />
          </svg>
          {repo.forks}
        </span>
      </div>
    </a>
  );
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGitHubData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const profile = data?.profile;
  const repos = data?.repos ?? [];
  const featuredRepos = repos.filter((r) => featuredRepoNames.includes(r.name));
  // Fill up to 8 spots if fewer featured were returned
  const displayRepos: GitHubRepo[] = featuredRepos.length >= 4
    ? featuredRepos.slice(0, 8)
    : repos.slice(0, 8);

  const publicRepos = profile?.publicRepos ?? githubConfig.stats.publicRepos;
  const followers = profile?.followers ?? githubConfig.stats.followers;
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);

  return (
    <section id="github" className="github-section">
      <div className="section-container">
        <SectionTitle
          title="GitHub Activity"
          subtitle="Open-source contributions & live repository stats"
          accent="#00d4ff"
        />

        {/* Profile strip */}
        <div className="gh-profile-strip">
          <img
            src={githubConfig.avatarUrl}
            alt="Choeng Rayu GitHub avatar"
            className="gh-avatar"
            width={72}
            height={72}
          />
          <div className="gh-profile-info">
            <div className="gh-profile-name">Choeng Rayu</div>
            <div className="gh-profile-bio">{githubConfig.bio}</div>
            <a
              href={githubConfig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-profile-link"
            >
              github.com/Choeng-Rayu →
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="gh-stats-row">
          <StatCard
            value={publicRepos}
            label="Public Repos"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h16V5H4zm4 6h8v2H8v-2zm0-4h8v2H8V7zm0 8h5v2H8v-2z" />
              </svg>
            }
          />
          <StatCard
            value={followers}
            label="Followers"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            }
          />
          <StatCard
            value={loading ? '...' : totalStars}
            label="Total Stars"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 .587l3.668 7.431L24 9.279l-6 5.849 1.416 8.265L12 18.897l-7.416 4.496L6 15.128 0 9.279l8.332-1.261L12 .587z" />
              </svg>
            }
          />
          <StatCard
            value="3+"
            label="Years on GitHub"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            }
          />
        </div>

        {/* Contribution graph banner */}
        <div className="gh-contribution-banner">
          <img
            src={`https://ghchart.rshah.org/00d4ff/${githubConfig.username}`}
            alt="GitHub contribution chart"
            className="gh-contribution-img"
            loading="lazy"
          />
        </div>

        {/* Repo cards */}
        <div className="gh-repos-heading">
          <h3>Featured Repositories</h3>
          <a href={githubConfig.profileUrl} target="_blank" rel="noopener noreferrer" className="gh-view-all">
            View all →
          </a>
        </div>
        {loading ? (
          <div className="gh-repos-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="gh-repo-card gh-repo-skeleton" />
            ))}
          </div>
        ) : (
          <div className="gh-repos-grid">
            {displayRepos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
