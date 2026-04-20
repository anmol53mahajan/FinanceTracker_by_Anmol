import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import EmptyState from '../components/ui/empty-state.jsx'
import Button from '../components/ui/button.jsx'
import Input from '../components/ui/input.jsx'
import { Card, CardBody } from '../components/ui/card.jsx'
import useBudget from '../hooks/useBudget.js'
import useCurrency from '../hooks/useCurrency.js'
import useTransactions from '../hooks/useTransactions.js'
import { getCategoryBreakdown } from '../utils/finance.js'
import { FiRepeat, FiTarget, FiTrendingDown, FiDollarSign } from 'react-icons/fi'

export default function Budget() {
  const { monthlyBudget, setMonthlyBudget, summary } = useBudget()
  const { transactions } = useTransactions()
  const { formatCurrency } = useCurrency()
  const [budgetValue, setBudgetValue] = useState(monthlyBudget)

  useEffect(() => {
    setBudgetValue(monthlyBudget)
  }, [monthlyBudget])

  const recurringExpenses = useMemo(
    () => transactions.filter((transaction) => transaction.recurring && transaction.type === 'expense'),
    [transactions],
  )

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions])

  const saveBudget = () => {
    const parsedBudget = Number(budgetValue)

    if (!parsedBudget || parsedBudget <= 0) {
      toast.error('Enter a valid monthly budget.')
      return
    }

    setMonthlyBudget(parsedBudget)
    toast.success('Monthly budget updated.')
  }

  return (
    <div className="space-y-4 pb-24 lg:pb-4">
      <PageHeader
        eyebrow="Budget"
        title="Budget tracking"
        description="Set a monthly budget, watch remaining spend, and inspect recurring expenses."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard title="Monthly budget" value={formatCurrency(monthlyBudget)} icon={FiDollarSign} />
        <StatCard title="Spent" value={formatCurrency(summary.totalExpenses)} icon={FiTrendingDown} />
        <StatCard title="Remaining" value={formatCurrency(summary.remainingBudget)} icon={FiTarget} />
        <StatCard title="Recurring bills" value={String(recurringExpenses.length)} icon={FiRepeat} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardBody className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Update monthly budget</h2>
              <p className="text-sm text-zinc-400">The app uses this value to calculate usage and remaining balance.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                type="number"
                min="0"
                value={budgetValue}
                onChange={(event) => setBudgetValue(event.target.value)}
                placeholder="50000"
              />
              <Button onClick={saveBudget}>Save budget</Button>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-zinc-300">
              <p>Budget used: {summary.budgetUsed.toFixed(0)}%</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                  style={{ width: `${Math.min(summary.budgetUsed, 100)}%` }}
                />
              </div>
              <p>{summary.remainingBudget >= 0 ? 'Plenty left in the budget.' : 'The budget is exceeded.'}</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Spending by category</h2>
              <p className="text-sm text-zinc-400">Largest expense categories contributing to the budget.</p>
            </div>

            {categoryBreakdown.length ? (
              <div className="space-y-3">
                {categoryBreakdown.map((item) => {
                  const maximumAmount = categoryBreakdown[0]?.amount || 1
                  const width = Math.max((item.amount / maximumAmount) * 100, 8)

                  return (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{item.category}</span>
                        <span className="text-zinc-500">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <EmptyState
                title="No expense categories yet"
                description="Once you add expenses, category spending will appear here."
              />
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Recurring expenses</h2>
            <p className="text-sm text-zinc-400">Highlighted recurring transactions that affect the budget every month.</p>
          </div>

          {recurringExpenses.length ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {recurringExpenses.map((transaction) => (
                <div key={transaction.id} className="rounded-2xl border border-indigo-500/20 bg-indigo-500/8 p-4">
                  <p className="font-medium text-white">{transaction.title}</p>
                  <p className="text-sm text-zinc-400">{transaction.category}</p>
                  <p className="mt-3 text-lg font-semibold text-indigo-300">-{formatCurrency(transaction.amount)}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No recurring expenses yet"
              description="Mark an expense as recurring to surface it in this section."
            />
          )}
        </CardBody>
      </Card>
    </div>
  )
}