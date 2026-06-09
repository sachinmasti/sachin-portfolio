export function PythonLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 11-1.39 1.394c0-.773.625-1.394 1.39-1.394z" fill="#4584b6"/>
      <path d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.394 1.394 0 111.39-1.394c0 .773-.625 1.394-1.39 1.394z" fill="#ffde57"/>
    </svg>
  );
}

export function PandasLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect x="8" y="10" width="12" height="44" rx="2" fill="#130654" />
      <rect x="26" y="10" width="12" height="44" rx="2" fill="#e70488" />
      <rect x="44" y="10" width="12" height="44" rx="2" fill="#130654" />
    </svg>
  );
}

export function NumPyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="8" width="52" height="48" rx="4" fill="#4dabcf" />
      <text x="32" y="44" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="monospace">N</text>
    </svg>
  );
}

export function SQLLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="28" rx="20" ry="10" stroke="#8052ff" strokeWidth="2.5" fill="none" />
      <ellipse cx="32" cy="28" rx="20" ry="10" stroke="#8052ff" strokeWidth="2.5" fill="none" transform="rotate(180, 32, 28)" strokeDasharray="2 3" opacity="0.4" />
      <text x="32" y="33" textAnchor="middle" fill="#8052ff" fontSize="16" fontWeight="bold" fontFamily="monospace">SQL</text>
      <line x1="12" y1="28" x2="12" y2="44" stroke="#8052ff" strokeWidth="2" />
      <line x1="52" y1="28" x2="52" y2="44" stroke="#8052ff" strokeWidth="2" />
      <path d="M12 44 Q32 52 52 44" stroke="#8052ff" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function TableauLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="12" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="24" y="12" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="38" y="12" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="10" y="26" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="24" y="26" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="38" y="26" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="24" y="40" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="38" y="40" width="10" height="10" rx="2" fill="#e97627" />
      <rect x="52" y="40" width="6" height="16" rx="1" fill="#e97627" />
    </svg>
  );
}

export function StatsLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="42" width="10" height="14" rx="2" fill="#ffb829" />
      <rect x="20" y="32" width="10" height="24" rx="2" fill="#ffb829" />
      <rect x="34" y="22" width="10" height="34" rx="2" fill="#ffb829" />
      <rect x="48" y="12" width="10" height="44" rx="2" fill="#ffb829" />
      <line x1="4" y1="50" x2="60" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    </svg>
  );
}

export function MLLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="18" r="8" stroke="#15846e" strokeWidth="2.5" fill="none" />
      <circle cx="18" cy="44" r="8" stroke="#15846e" strokeWidth="2.5" fill="none" />
      <circle cx="46" cy="44" r="8" stroke="#15846e" strokeWidth="2.5" fill="none" />
      <line x1="27" y1="25" x2="22" y2="37" stroke="#15846e" strokeWidth="2" />
      <line x1="37" y1="25" x2="42" y2="37" stroke="#15846e" strokeWidth="2" />
      <line x1="18" y1="44" x2="46" y2="44" stroke="#15846e" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

export function DataVizLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="18" stroke="#8052ff" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="32" cy="32" r="12" stroke="#8052ff" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="32" cy="32" r="6" stroke="#8052ff" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="2" fill="#8052ff" />
      <line x1="32" y1="32" x2="47" y2="20" stroke="#8052ff" strokeWidth="1.5" />
      <line x1="32" y1="32" x2="38" y2="47" stroke="#8052ff" strokeWidth="1.5" />
      <line x1="32" y1="32" x2="20" y2="40" stroke="#8052ff" strokeWidth="1.5" />
      <circle cx="47" cy="20" r="2" fill="#8052ff" />
      <circle cx="38" cy="47" r="2" fill="#8052ff" />
      <circle cx="20" cy="40" r="2" fill="#8052ff" />
    </svg>
  );
}
