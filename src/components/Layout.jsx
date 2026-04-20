import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FiBarChart2, FiGrid, FiList, FiPlusCircle, FiTarget } from 'react-icons/fi'
import Button from './ui/button.jsx'
import Select from './ui/select.jsx'
import { Card, CardBody } from './ui/card.jsx'
import useCurrency from '../hooks/useCurrency.js'
import useTransactions from '../hooks/useTransactions.js'
import useBudget from '../hooks/useBudget.js'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/transactions', label: 'Transactions', icon: FiList },
  { to: '/transactions/new', label: 'Add Transaction', icon: FiPlusCircle },
  { to: '/budget', label: 'Budget', icon: FiTarget },
  { to: '/analytics', label: 'Analytics', icon: FiBarChart2 },
]

export default function Layout() {
  const { pathname } = useLocation()
  const { currencyOptions, preferredCurrency, setPreferredCurrency } = useCurrency()
  const { clearAllData } = useTransactions()
  const { summary } = useBudget()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.12),transparent_24%),var(--bg)] text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 p-4 lg:p-6">
        <aside className="glass-panel hidden w-[280px] shrink-0 rounded-2xl p-4 lg:flex lg:flex-col">
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                <FiBarChart2 />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Finance</p>
                <h1 className="text-lg font-semibold text-white">Pulse Ledger</h1>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon }) => {
              const NavIcon = icon

              return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isActive || pathname === to
                      ? 'border-primary/30 bg-primary/12 text-white'
                      : 'border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/12 hover:bg-white/[0.05] hover:text-white'
                  }`
                }
              >
                <NavIcon className="text-base" />
                {label}
              </NavLink>
              )
            })}
          </nav>

          <Card className="mt-6 border-white/8 bg-white/[0.03]">
            <CardBody className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Budget snapshot</p>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-white">{summary.budgetUsed.toFixed(0)}%</p>
                    <p className="text-xs text-zinc-500">of monthly budget used</p>
                  </div>
                  <FiTarget className="text-xl text-primary" />
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 p-3 text-xs text-zinc-400">
                {summary.remainingBudget >= 0 ? 'You are within budget this month.' : 'Budget exceeded this month.'}
              </div>
            </CardBody>
          </Card>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="glass-panel sticky top-4 z-30 rounded-2xl px-4 py-3 backdrop-blur-xl lg:px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <FiBarChart2 />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Finance</p>
                    <h1 className="text-lg font-semibold text-white">Pulse Ledger</h1>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Live portfolio</p>
                  <p className="text-sm text-zinc-400">Track income, expenses, budgets, and spending trends.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Select
                  className="min-w-24"
                  value={preferredCurrency}
                  onChange={(event) => setPreferredCurrency(event.target.value)}
                >
                  {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
                <Button variant="ghost" onClick={clearAllData}>
                  Clear data
                </Button>
              </div>
            </div>
          </header>

          <div className="grid min-h-0 gap-4 lg:grid-cols-[1fr]">
            <Outlet />
          </div>
        </main>
      </div>

      <nav className="glass-panel fixed inset-x-4 bottom-4 z-40 grid grid-cols-5 gap-2 rounded-2xl p-2 lg:hidden">
        {navItems.map(({ to, label, icon }) => {
          const NavIcon = icon

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition ${
                  isActive || pathname === to ? 'bg-primary/15 text-white' : 'text-zinc-500'
                }`
              }
            >
              <NavIcon className="text-base" />
              <span>{label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}