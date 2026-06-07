import { navigation } from "@/data/navigation";
import { socials } from "@/data/socials";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-void">
      <div className="section-shell flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-bone">SACHIN MASTI</p>
          <p className="mt-2 text-[15px] font-normal leading-[1.5] tracking-[0.025em] text-smoke">
            Copyright © {new Date().getFullYear()} Sachin Masti. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.05em] text-smoke transition hover:text-bone">
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
                className="grid h-10 w-10 place-items-center rounded-[24px] border border-line text-ash transition hover:text-bone"
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
