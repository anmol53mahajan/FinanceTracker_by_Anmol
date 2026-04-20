export default function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text outline-none transition placeholder:text-zinc-500 focus:border-primary focus:bg-white/[0.07] focus:ring-2 focus:ring-primary/20 ${className}`}
      {...props}
    />
  )
}