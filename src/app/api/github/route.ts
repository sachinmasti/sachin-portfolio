import { NextResponse } from "next/server";

export async function GET() {
  const username = "sachinmasti";

  try {
    const [userRes, commitsRes, prsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        headers: { Accept: "application/vnd.github.cloak-preview" },
      }),
      fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`),
    ]);

    const userData = userRes.ok ? await userRes.json() : null;
    const commitsData = commitsRes.ok ? await commitsRes.json() : null;
    const prsData = prsRes.ok ? await prsRes.json() : null;

    return NextResponse.json({
      public_repos: userData?.public_repos ?? 0,
      followers: userData?.followers ?? 0,
      following: userData?.following ?? 0,
      commits: commitsData?.total_count ?? 0,
      prs: prsData?.total_count ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "GitHub API unavailable" }, { status: 502 });
  }
}
