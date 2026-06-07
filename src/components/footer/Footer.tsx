import { navigation } from "@/data/navigation";
import { socials } from "@/data/socials";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/70">
      <div className="section-shell flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-white">SACHIN MASTI</p>
          <p className="mt-2 text-sm text-muted">
            Copyright © {new Date().getFullYear()} Sachin Masti. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-white transition hover:border-accent hover:text-accent"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
