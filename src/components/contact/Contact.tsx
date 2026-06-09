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
    <section id="contact" className="section-shell py-[60px]">
      <SectionHeading
        eyebrow="Contact"
        title="Let data start the conversation."
        description="Reach out for collaborations, project ideas, mentorship, or opportunities."
      />

      <motion.form
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        onSubmit={handleSubmit}
        className="premium-border mx-auto grid max-w-2xl gap-4 p-6"
      >
        <input type="hidden" name="to_email" value="sachinmasti88@gmail.com" />
        <label className="grid gap-2 text-caption font-semibold uppercase tracking-[0.05em] text-bone">
          Name
          <input
            required
            name="name"
            className="min-h-12 rounded-[24px] border border-white/[0.1] bg-void/30 px-4 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition placeholder:text-smoke focus:border-plum-voltage"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-caption font-semibold uppercase tracking-[0.05em] text-bone">
          Email
          <input
            required
            type="email"
            name="email"
            className="min-h-12 rounded-[24px] border border-white/[0.1] bg-void/30 px-4 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition placeholder:text-smoke focus:border-plum-voltage"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-caption font-semibold uppercase tracking-[0.05em] text-bone">
          Message
          <textarea
            required
            name="message"
            rows={5}
            className="resize-none rounded-[24px] border border-white/[0.1] bg-void/30 px-4 py-3 text-subheading font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition placeholder:text-smoke focus:border-plum-voltage"
            placeholder="Tell me what you are building..."
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[24px] bg-plum-voltage px-6 py-3.5 text-caption font-semibold uppercase tracking-[0.05em] text-bone transition hover:opacity-90 disabled:opacity-60"
          data-cursor="magnetic"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" ? (
          <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-lichen">
            Message sent successfully.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-amber-spark">
            Email service not configured. Add EmailJS credentials to <code className="text-caption rounded-[8px] bg-white/[0.06] px-2 py-0.5">.env.local</code> to receive messages here.
          </p>
        ) : null}

        <div className="mt-2 flex items-center justify-center gap-4 border-t border-white/[0.06] pt-5">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-[24px] border border-line text-ash transition hover:text-bone"
                data-cursor="magnetic"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </motion.form>
    </section>
  );
}
