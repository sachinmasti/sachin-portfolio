"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socials } from "@/data/socials";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let data start the conversation."
        description="Reach out for collaborations, project ideas, mentorship, or opportunities."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="premium-border bg-white/[0.025] p-7"
        >
          <h3 className="text-2xl font-semibold text-white">Sachin Masti</h3>
          <p className="mt-4 text-base leading-8 text-muted">
            Aspiring Data Scientist & Machine Learning Enthusiast focused on building intelligent, practical solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-white transition hover:border-accent hover:text-accent"
                  data-cursor="magnetic"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={handleSubmit}
          className="premium-border grid gap-4 bg-black/55 p-6 sm:p-7"
        >
          <input type="hidden" name="to_email" value="sachinmasti88@gmail.com" />
          <label className="grid gap-2 text-sm text-white">
            Name
            <input
              required
              name="name"
              className="min-h-12 border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition focus:border-accent"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm text-white">
            Email
            <input
              required
              type="email"
              name="email"
              className="min-h-12 border border-white/10 bg-white/[0.03] px-4 text-white outline-none transition focus:border-accent"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm text-white">
            Message
            <textarea
              required
              name="message"
              rows={5}
              className="resize-none border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition focus:border-accent"
              placeholder="Tell me what you are building..."
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-12 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-accent hover:text-white disabled:opacity-60"
            data-cursor="magnetic"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" ? <p className="text-sm text-white">Message sent successfully.</p> : null}
          {status === "error" ? (
            <p className="text-sm text-muted">EmailJS is not configured yet or the request failed.</p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
