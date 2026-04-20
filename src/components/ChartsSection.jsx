import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardBody } from './ui/card.jsx'

const pieColors = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#f43f5e']

function chartTooltipStyle() {
  return {
    contentStyle: {
      background: 'rgba(15, 15, 18, 0.98)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
      color: '#e4e4e7',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
    },
    labelStyle: { color: '#a1a1aa' },
  }
}

export function CategoryPiePanel({ data, formatCurrency }) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white">Spending by category</h3>
          <p className="text-sm text-zinc-400">Where the monthly money is going.</p>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="amount" nameKey="category" innerRadius={74} outerRadius={116} paddingAngle={3}>
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} {...chartTooltipStyle()} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: '#d4d4d8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}

export function TrendAreaPanel({ data, formatCurrency }) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white">Monthly spending trend</h3>
          <p className="text-sm text-zinc-400">Income and expenses over time.</p>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} {...chartTooltipStyle()} />
              <Legend />
              <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" stroke="#6366f1" fill="url(#expenseGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}

export function IncomeExpenseBarPanel({ data, formatCurrency }) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white">Income vs expense</h3>
          <p className="text-sm text-zinc-400">Monthly comparison by category flow.</p>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} {...chartTooltipStyle()} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" radius={[10, 10, 0, 0]} />
              <Bar dataKey="expense" fill="#f43f5e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}

export function CashFlowLinePanel({ data, formatCurrency }) {
  return (
    <Card>
      <CardBody className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white">Net cash flow</h3>
          <p className="text-sm text-zinc-400">A lighter view of balance momentum.</p>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} {...chartTooltipStyle()} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="expense" stroke="#6366f1" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}