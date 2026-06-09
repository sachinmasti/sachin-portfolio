export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05]">
      <div className="section-shell flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-body-sm font-semibold tracking-[0.021em] text-bone">
          SACHIN MASTI
        </p>
        <p className="text-subheading font-regular leading-[1.5] tracking-[0.025em] text-smoke">
          Copyright &copy; {new Date().getFullYear()} Sachin Masti. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
