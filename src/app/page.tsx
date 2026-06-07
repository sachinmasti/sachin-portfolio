import { About } from "@/components/about/About";
import { Blog } from "@/components/blog/Blog";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { GitHubStats } from "@/components/github/GitHubStats";
import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/navbar/Navbar";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStats />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
