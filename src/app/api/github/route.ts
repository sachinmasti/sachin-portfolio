import { NextResponse } from "next/server";

export async function GET() {
  const username = "sachinmasti";

  try {
    const [userRes, commitsRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        headers: { Accept: "application/vnd.github.cloak-preview" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
    ]);

    const userData = userRes?.ok ? await userRes.json() : null;
    const commitsData = commitsRes?.ok ? await commitsRes.json() : null;
    const contribData = contribRes?.ok ? await contribRes.json() : null;

    return NextResponse.json({
      public_repos: userData?.public_repos ?? 32,
      commits: commitsData?.total_count ?? 369,
      contributions: contribData?.contributions ?? [],
      totalContributions: contribData?.total?.lastYear ?? commitsData?.total_count ?? 369,
    });
  } catch {
    return NextResponse.json({
      public_repos: 32,
      commits: 369,
      contributions: [],
      totalContributions: 369,
    });
  }
}


