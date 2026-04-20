import { Card, CardBody } from './ui/card.jsx'

export default function StatCard({ title, value, hint, icon: Icon, accent = 'text-primary' }) {
  return (
    <Card>
      <CardBody className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          {hint ? <p className="text-sm text-zinc-400">{hint}</p> : null}
        </div>
        {Icon ? (
          <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ${accent}`}>
            <Icon className="text-xl" />
          </div>
        ) : null}
      </CardBody>
    </Card>
  )
}