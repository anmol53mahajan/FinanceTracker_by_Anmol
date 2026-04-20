import { Card, CardBody } from './ui/card.jsx'

export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <Card>
      <CardBody className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.32em] text-primary">{eyebrow}</p> : null}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h1>
            {description ? <p className="max-w-2xl text-sm text-zinc-400">{description}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </CardBody>
    </Card>
  )
}