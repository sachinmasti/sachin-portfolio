import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiMedium } from "react-icons/si";
import type { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/sachinmasti", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sachin-masti-23a275228/", icon: FaLinkedinIn },
  { label: "Medium", href: "https://medium.com/@sachinmasti88", icon: SiMedium },
  { label: "X", href: "https://x.com/sachin_masti88", icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/mai_sachin.845", icon: FaInstagram }
];
