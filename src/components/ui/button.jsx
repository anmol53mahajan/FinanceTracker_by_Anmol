import { cloneElement, isValidElement } from 'react'

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  asChild = false,
  ...props
}) {
  const variants = {
    primary:
      'bg-primary text-white shadow-glow hover:bg-indigo-500 focus-visible:ring-primary/50',
    secondary:
      'bg-white/5 text-text border border-white/10 hover:bg-white/10 focus-visible:ring-white/30',
    ghost: 'bg-transparent text-text hover:bg-white/5 focus-visible:ring-white/20',
    danger: 'bg-danger text-white hover:bg-red-500 focus-visible:ring-red-400/50',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-xl border border-transparent font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`,
      ...props,
    })
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}