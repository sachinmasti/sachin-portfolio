"use client";
import { FormEvent, MouseEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { fadeUp } from "@/animations/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaEnvelope } from "react-icons/fa6";
import { socials } from "@/data/socials";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

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
      // Auto dismiss success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-shell py-8 sm:py-[40px]">
      <SectionHeading
        eyebrow="Contact"
        title="Let data start the conversation."
        description="Reach out for collaborations or project ideas."
      />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        onMouseMove={handleMouseMove}
        className="group relative mx-auto max-w-xl overflow-hidden rounded-[32px] border border-white/[0.08] bg-void/30 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-void/40 sm:p-8"
      >
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-plum-voltage/10 blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-amber-spark/5 blur-[80px]" />
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(33,241,168, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center mb-6 text-center">
          <h3 className="text-[26px] font-extralight leading-[1.1] tracking-[-0.04em] text-bone transition-colors hover:text-plum-voltage">
            Let&apos;s Connect
          </h3>
          <p className="mt-2 max-w-sm text-[14px] font-regular leading-[1.5] tracking-[0.025em] text-smoke">
            Whether it&apos;s data, ideas, or the next big thing — my inbox is always open.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 grid gap-4">
          <input type="hidden" name="to_email" value="sachinmasti88@gmail.com" />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[12px] font-semibold uppercase tracking-[0.05em] text-bone/90">
              Name
              <input
                required
                name="name"
                className="min-h-[48px] rounded-[20px] border border-white/[0.08] bg-white/[0.02] px-5 text-[14px] font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition-all duration-300 placeholder:text-smoke/50 hover:border-white/[0.2] focus:border-plum-voltage/60 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(33,241,168,0.1)]"
                placeholder="Your name"
              />
            </label>
            
            <label className="grid gap-1.5 text-[12px] font-semibold uppercase tracking-[0.05em] text-bone/90">
              Email
              <input
                required
                type="email"
                name="email"
                className="min-h-[48px] rounded-[20px] border border-white/[0.08] bg-white/[0.02] px-5 text-[14px] font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition-all duration-300 placeholder:text-smoke/50 hover:border-white/[0.2] focus:border-plum-voltage/60 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(33,241,168,0.1)]"
                placeholder="you@example.com"
              />
            </label>
          </div>
          
          <label className="grid gap-1.5 text-[12px] font-semibold uppercase tracking-[0.05em] text-bone/90">
            Message
            <textarea
              required
              name="message"
              rows={3}
              className="resize-none rounded-[20px] border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-[14px] font-regular leading-[1.5] tracking-[0.025em] text-bone outline-none transition-all duration-300 placeholder:text-smoke/50 hover:border-white/[0.2] focus:border-plum-voltage/60 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(33,241,168,0.1)]"
              placeholder="Tell me what you are building..."
            />
          </label>
          
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 rounded-[20px] bg-plum-voltage px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.05em] text-void transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(33,241,168,0.4)] active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[20px] border border-lichen/30 bg-lichen/10 p-3 text-center"
            >
              <p className="text-[14px] font-regular leading-[1.5] tracking-[0.025em] text-lichen">
                Message received! 🚀
              </p>
            </motion.div>
          ) : null}
          
          {status === "error" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }} 
              className="rounded-[20px] border border-amber-spark/30 bg-amber-spark/10 p-3 text-center"
            >
              <p className="text-[13px] font-regular leading-[1.5] tracking-[0.025em] text-amber-spark">
                Error sending.{" "}
                <a href="mailto:sachinmasti88@gmail.com" className="underline hover:text-bone">Email me</a> instead.
              </p>
            </motion.div>
          ) : null}
        </form>

        <div className="relative z-10 mt-8 flex flex-col items-center border-t border-white/[0.05] pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.05em] text-ash/80">
            Or connect via
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:sachinmasti88@gmail.com"
              className="group grid h-10 w-10 place-items-center rounded-[20px] border border-white/[0.08] bg-white/[0.02] text-ash transition-all duration-300 hover:-translate-y-1 hover:border-plum-voltage/40 hover:bg-white/[0.05] hover:text-plum-voltage hover:shadow-[0_0_15px_rgba(33,241,168,0.15)]"
              aria-label="Email"
            >
              <FaEnvelope size={16} />
            </a>
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-[20px] border border-white/[0.08] bg-white/[0.02] text-ash transition-all duration-300 hover:-translate-y-1 hover:border-plum-voltage/40 hover:bg-white/[0.05] hover:text-plum-voltage hover:shadow-[0_0_15px_rgba(33,241,168,0.15)]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
