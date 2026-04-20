import { FiInbox } from 'react-icons/fi'
import { Card, CardBody } from './card.jsx'

export default function EmptyState({ title, description, action }) {
  return (
    <Card className="border-dashed border-white/10 bg-white/[0.03] shadow-none">
      <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="rounded-full border border-white/10 bg-white/5 p-4 text-2xl text-zinc-400">
          <FiInbox />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="max-w-md text-sm text-zinc-400">{description}</p>
        </div>
        {action}
      </CardBody>
    </Card>
  )
}