import { NextResponse } from 'next/server';

export const revalidate = 3600;

const USERNAME = 'vanyanv';
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'vanyan-os-portfolio',
};

type GithubProfile = {
  name?: string | null;
  login?: string | null;
  html_url?: string | null;
  public_repos?: number | null;
  followers?: number | null;
};

type GithubRepo = {
  name?: string | null;
  html_url?: string | null;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number | null;
  pushed_at?: string | null;
};

export async function GET() {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=5`,
        {
          headers,
          next: { revalidate },
        },
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error('GitHub request failed');
    }

    const profile = (await profileRes.json()) as GithubProfile;
    const repos = (await reposRes.json()) as GithubRepo[];

    return NextResponse.json(
      {
        profile: {
          name: profile.name ?? USERNAME,
          login: profile.login ?? USERNAME,
          htmlUrl: profile.html_url ?? `https://github.com/${USERNAME}`,
          publicRepos: profile.public_repos ?? 0,
          followers: profile.followers ?? 0,
        },
        repos: repos.map((repo) => ({
          name: repo.name ?? 'Untitled repo',
          htmlUrl: repo.html_url ?? `https://github.com/${USERNAME}`,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count ?? 0,
          pushedAt: repo.pushed_at,
        })),
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch {
    return NextResponse.json(
      { message: 'GitHub widget data unavailable' },
      { status: 502 },
    );
  }
}
