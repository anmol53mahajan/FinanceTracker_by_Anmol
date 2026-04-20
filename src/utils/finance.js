import {
  compareDesc,
  format,
  isWithinInterval,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns'

export const expenseCategories = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
]

export const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Gift', 'Refund', 'Other']

export function sortTransactions(transactions, sortKey = 'date', sortDirection = 'desc') {
  const sorted = [...transactions].sort((left, right) => {
    if (sortKey === 'amount') {
      return Number(left.amount) - Number(right.amount)
    }

    if (sortKey === 'category') {
      return left.category.localeCompare(right.category)
    }

    return compareDesc(parseISO(left.date), parseISO(right.date))
  })

  return sortDirection === 'asc' ? sorted.reverse() : sorted
}

export function calculateSummary(transactions, monthlyBudget) {
  const totals = transactions.reduce(
    (accumulator, transaction) => {
      const amount = Number(transaction.amount) || 0

      if (transaction.type === 'income') {
        accumulator.totalIncome += amount
      } else {
        accumulator.totalExpenses += amount
        accumulator.categoryTotals[transaction.category] =
          (accumulator.categoryTotals[transaction.category] || 0) + amount
      }

      return accumulator
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      categoryTotals: {},
    },
  )

  const netBalance = totals.totalIncome - totals.totalExpenses
  const remainingBudget = monthlyBudget - totals.totalExpenses
  const budgetUsed = monthlyBudget > 0 ? (totals.totalExpenses / monthlyBudget) * 100 : 0

  const topCategory = Object.entries(totals.categoryTotals).sort((left, right) => right[1] - left[1])[0]

  return {
    ...totals,
    netBalance,
    remainingBudget,
    budgetUsed,
    topCategory: topCategory ? { category: topCategory[0], amount: topCategory[1] } : null,
  }
}

export function getMonthlyTrend(transactions, months = 6) {
  const monthBuckets = Array.from({ length: months }).map((_, index) => {
    const monthDate = subMonths(new Date(), months - index - 1)

    return {
      key: format(monthDate, 'yyyy-MM'),
      label: format(monthDate, 'MMM'),
      income: 0,
      expense: 0,
    }
  })

  transactions.forEach((transaction) => {
    const transactionDate = parseISO(transaction.date)
    const bucket = monthBuckets.find((item) => item.key === format(transactionDate, 'yyyy-MM'))

    if (!bucket) {
      return
    }

    const amount = Number(transaction.amount) || 0

    if (transaction.type === 'income') {
      bucket.income += amount
    } else {
      bucket.expense += amount
    }
  })

  return monthBuckets
}

export function getCategoryBreakdown(transactions) {
  const totals = transactions.reduce((accumulator, transaction) => {
    if (transaction.type !== 'expense') {
      return accumulator
    }

    const amount = Number(transaction.amount) || 0
    accumulator[transaction.category] = (accumulator[transaction.category] || 0) + amount
    return accumulator
  }, {})

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((left, right) => right.amount - left.amount)
}

export function filterTransactions(transactions, filters) {
  const {
    search = '',
    category = 'all',
    type = 'all',
    startDate = '',
    endDate = '',
  } = filters

  return transactions.filter((transaction) => {
    const searchableText = `${transaction.title} ${transaction.notes}`.toLowerCase()
    const matchesSearch = searchableText.includes(search.toLowerCase())
    const matchesCategory = category === 'all' || transaction.category === category
    const matchesType = type === 'all' || transaction.type === type

    const transactionDate = parseISO(transaction.date)
    const matchesStartDate = !startDate || transactionDate >= parseISO(startDate)
    const matchesEndDate = !endDate || transactionDate <= parseISO(endDate)

    return matchesSearch && matchesCategory && matchesType && matchesStartDate && matchesEndDate
  })
}

export function isCurrentMonthTransaction(dateValue) {
  return isWithinInterval(parseISO(dateValue), {
    start: startOfMonth(new Date()),
    end: new Date(),
  })
}