import { FiEdit3, FiTrash2, FiRepeat } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Badge from './ui/badge.jsx'
import Button from './ui/button.jsx'
import { Card, CardBody } from './ui/card.jsx'
import { format } from 'date-fns'

export default function TransactionCard({ transaction, formatCurrency, onDelete }) {
  return (
    <article className="transition-transform duration-200 hover:scale-[1.02]">
      <Card className="overflow-hidden">
        <CardBody className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-white">{transaction.title}</h3>
              <Badge tone={transaction.type}>{transaction.type}</Badge>
              {transaction.recurring ? (
                <Badge tone="recurring" className="gap-1">
                  <FiRepeat />
                  Recurring
                </Badge>
              ) : null}
            </div>
            <p className="text-sm text-zinc-400">
              {transaction.category} • {format(new Date(transaction.date), 'dd MMM yyyy')}
            </p>
            {transaction.notes ? <p className="text-sm text-zinc-500">{transaction.notes}</p> : null}
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className={`text-xl font-semibold ${transaction.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link to={`/transactions/${transaction.id}/edit`}>
                  <FiEdit3 />
                  Edit
                </Link>
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(transaction.id)}>
                <FiTrash2 />
                Delete
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </article>
  )
}