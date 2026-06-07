import type { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  description: string;
  icon: IconType;
};

export type Project = {
  title: string;
  description: string;
  status: "In Progress" | "Planned" | "Live";
  tags: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};
