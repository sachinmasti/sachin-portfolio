import type { GitHubUser } from "@/types";

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error("Unable to fetch GitHub profile");
  }

  return response.json() as Promise<GitHubUser>;
}
