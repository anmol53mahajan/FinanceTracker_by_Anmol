export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'bg-white/6 text-zinc-200 border-white/10',
    income: 'bg-emerald-500/14 text-emerald-300 border-emerald-500/25',
    expense: 'bg-rose-500/14 text-rose-300 border-rose-500/25',
    recurring: 'bg-indigo-500/14 text-indigo-300 border-indigo-500/25',
    muted: 'bg-white/5 text-zinc-400 border-white/10',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}