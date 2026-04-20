import { FiArrowRight, FiPieChart, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import EmptyState from '../components/ui/empty-state.jsx'
import Button from '../components/ui/button.jsx'
import { Card, CardBody } from '../components/ui/card.jsx'
import { CategoryPiePanel } from '../components/ChartsSection.jsx'
import useBudget from '../hooks/useBudget.js'
import useCurrency from '../hooks/useCurrency.js'
import useTransactions from '../hooks/useTransactions.js'
import { getCategoryBreakdown } from '../utils/finance.js'
import { format } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'

export default function Dashboard() {
  const { transactions } = useTransactions()
  const { summary } = useBudget()
  const { formatCurrency } = useCurrency()

  const recentTransactions = [...transactions].slice(0, 5)
  const categoryBreakdown = getCategoryBreakdown(transactions).slice(0, 6)

  return (
    <div className="space-y-4 pb-24 lg:pb-4">
      <PageHeader
        eyebrow="Overview"
        title="Financial dashboard"
        description="A quick read on income, expenses, budget health, and current spending pressure."
        actions={
          <>
            <Button variant="secondary" asChild>
              <Link to="/transactions">Open transactions <FiArrowRight /></Link>
            </Button>
            <Button asChild>
              <Link to="/transactions/new">Add transaction <FiArrowRight /></Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard title="Total income" value={formatCurrency(summary.totalIncome)} icon={FiTrendingUp} />
        <StatCard title="Total expenses" value={formatCurrency(summary.totalExpenses)} icon={FiTrendingDown} />
        <StatCard title="Net balance" value={formatCurrency(summary.netBalance)} icon={FiPieChart} />
        <StatCard
          title="Top category"
          value={summary.topCategory ? summary.topCategory.category : 'None'}
          hint={summary.topCategory ? formatCurrency(summary.topCategory.amount) : 'No expense data yet'}
          icon={FiCalendar}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <CategoryPiePanel data={categoryBreakdown} formatCurrency={formatCurrency} />

        <Card>
          <CardBody className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Budget health</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold text-white">{summary.budgetUsed.toFixed(0)}%</p>
                  <p className="text-sm text-zinc-400">of monthly budget used</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Remaining</p>
                  <p className={`text-xl font-semibold ${summary.remainingBudget >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {formatCurrency(summary.remainingBudget)}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
                style={{ width: `${Math.min(summary.budgetUsed, 100)}%` }}
              />
            </div>

            <div className="space-y-3 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-zinc-300">
              <p>{summary.remainingBudget >= 0 ? 'You are inside your budget.' : 'You have exceeded the monthly budget.'}</p>
              <p>Used {formatCurrency(summary.totalExpenses)} of {formatCurrency(summary.totalIncome || 0)} net inflow.</p>
            </div>

            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link to="/budget">Manage budget</Link>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent activity</h2>
              <p className="text-sm text-zinc-400">Latest transactions across all accounts.</p>
            </div>
            <Link className="text-sm text-primary hover:text-indigo-300" to="/transactions">
              View all
            </Link>
          </div>

          {recentTransactions.length ? (
            <div className="grid gap-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{transaction.title}</p>
                      <p className="text-sm text-zinc-500">
                        {transaction.category} · {format(new Date(transaction.date), 'dd MMM yyyy')}
                      </p>
                    </div>
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No transactions yet"
              description="Add your first income or expense to start tracking cash flow."
              action={
                <Button asChild>
                  <Link to="/transactions/new">Add transaction</Link>
                </Button>
              }
            />
          )}
        </CardBody>
      </Card>
    </div>
  )
}