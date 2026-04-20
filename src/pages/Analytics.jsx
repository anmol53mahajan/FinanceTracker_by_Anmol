import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import EmptyState from '../components/ui/empty-state.jsx'
import { Card, CardBody } from '../components/ui/card.jsx'
import useBudget from '../hooks/useBudget.js'
import useCurrency from '../hooks/useCurrency.js'
import useTransactions from '../hooks/useTransactions.js'
import {
  CashFlowLinePanel,
  CategoryPiePanel,
  IncomeExpenseBarPanel,
  TrendAreaPanel,
} from '../components/ChartsSection.jsx'
import { getCategoryBreakdown, getMonthlyTrend } from '../utils/finance.js'
import { FiActivity, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi'

export default function Analytics() {
  const { transactions } = useTransactions()
  const { summary } = useBudget()
  const { formatCurrency } = useCurrency()

  const categoryBreakdown = getCategoryBreakdown(transactions)
  const monthlyTrend = getMonthlyTrend(transactions, 6)

  if (!transactions.length) {
    return (
      <div className="space-y-4 pb-24 lg:pb-4">
        <PageHeader
          eyebrow="Analytics"
          title="Financial analytics"
          description="Create transactions first to unlock charts and deeper financial insights."
        />
        <EmptyState
          title="No data to analyze"
          description="Add transactions and the analytics dashboard will populate with charts and trend analysis."
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-24 lg:pb-4">
      <PageHeader
        eyebrow="Analytics"
        title="Financial analytics"
        description="Detailed charts and derived insights for category mix, trends, and cash flow balance."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard title="Net balance" value={formatCurrency(summary.netBalance)} icon={FiActivity} />
        <StatCard title="Income" value={formatCurrency(summary.totalIncome)} icon={FiTrendingUp} />
        <StatCard title="Expenses" value={formatCurrency(summary.totalExpenses)} icon={FiBarChart2} />
        <StatCard
          title="Top category"
          value={summary.topCategory?.category || 'None'}
          hint={summary.topCategory ? formatCurrency(summary.topCategory.amount) : 'No expense data'}
          icon={FiPieChart}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <CategoryPiePanel data={categoryBreakdown} formatCurrency={formatCurrency} />
        <TrendAreaPanel data={monthlyTrend} formatCurrency={formatCurrency} />
        <IncomeExpenseBarPanel data={monthlyTrend} formatCurrency={formatCurrency} />
        <CashFlowLinePanel data={monthlyTrend} formatCurrency={formatCurrency} />
      </div>

      <Card>
        <CardBody className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Key insights</h2>
            <p className="text-sm text-zinc-400">Auto-generated readout from the current transaction data.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Spending pressure</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {summary.budgetUsed.toFixed(0)}% of budget used
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {summary.remainingBudget >= 0 ? 'You are still within budget.' : 'Spending is above budget.'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Highest category</p>
              <p className="mt-2 text-lg font-semibold text-white">{summary.topCategory?.category || 'None'}</p>
              <p className="mt-2 text-sm text-zinc-400">
                {summary.topCategory ? formatCurrency(summary.topCategory.amount) : 'No expense data available.'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Cashflow direction</p>
              <p className={`mt-2 text-lg font-semibold ${summary.netBalance >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {summary.netBalance >= 0 ? 'Positive' : 'Negative'}
              </p>
              <p className="mt-2 text-sm text-zinc-400">Income is {summary.netBalance >= 0 ? 'outpacing' : 'below'} expenses.</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}