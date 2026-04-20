export function Card({ children, className = '' }) {
  return <div className={`glass-panel rounded-xl ${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }) {
  return <div className={`border-b border-white/8 px-5 py-4 ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>
}