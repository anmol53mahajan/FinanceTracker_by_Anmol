import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader.jsx'
import FiltersBar from '../components/FiltersBar.jsx'
import TransactionCard from '../components/TransactionCard.jsx'
import EmptyState from '../components/ui/empty-state.jsx'
import Button from '../components/ui/button.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useCurrency from '../hooks/useCurrency.js'
import useTransactions from '../hooks/useTransactions.js'
import { expenseCategories, filterTransactions, sortTransactions } from '../utils/finance.js'

export default function Transactions() {
  const { transactions, deleteTransaction } = useTransactions()
  const { formatCurrency } = useCurrency()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [type, setType] = useState('all')
  const [sortKey, setSortKey] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const debouncedSearch = useDebounce(search, 250)

  const filteredTransactions = useMemo(() => {
    const scoped = filterTransactions(transactions, {
      search: debouncedSearch,
      category,
      type,
      startDate,
      endDate,
    })

    return sortTransactions(scoped, sortKey, sortDirection)
  }, [transactions, debouncedSearch, category, type, startDate, endDate, sortKey, sortDirection])

  const resetFilters = () => {
    setSearch('')
    setCategory('all')
    setType('all')
    setSortKey('date')
    setSortDirection('desc')
    setStartDate('')
    setEndDate('')
  }

  const handleDelete = (transactionId) => {
    const transaction = transactions.find((item) => item.id === transactionId)
    deleteTransaction(transactionId)
    toast.success(`${transaction?.title || 'Transaction'} removed.`)
  }

  return (
    <div className="space-y-4 pb-24 lg:pb-4">
      <PageHeader
        eyebrow="Ledger"
        title="Transactions"
        description="Search, sort, filter, and manage the full transaction history."
        actions={
          <Button asChild>
            <Link to="/transactions/new">Add transaction</Link>
          </Button>
        }
      />

      <FiltersBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        categories={expenseCategories}
        onReset={resetFilters}
      />

      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>{filteredTransactions.length} transactions found</span>
        <span>Total visible amount: {formatCurrency(filteredTransactions.reduce((sum, item) => sum + Number(item.amount || 0), 0))}</span>
      </div>

      {filteredTransactions.length ? (
        <div className="grid gap-3">
          {filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              formatCurrency={formatCurrency}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No transactions match the filters"
          description="Try a different category, date range, or search term."
          action={<Button onClick={resetFilters}>Reset filters</Button>}
        />
      )}
    </div>
  )
}