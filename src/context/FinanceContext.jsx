import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { fetchCurrencyRates } from '../services/api.js'
import { calculateSummary } from '../utils/finance.js'

const STORAGE_KEYS = {
  transactions: 'finance-app.transactions',
  budget: 'finance-app.monthly-budget',
  currency: 'finance-app.currency',
}

const FinanceContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => readStorage(STORAGE_KEYS.transactions, []))
  const [monthlyBudget, setMonthlyBudget] = useState(() =>
    readStorage(STORAGE_KEYS.budget, 50000),
  )
  const [preferredCurrency, setPreferredCurrency] = useState(() =>
    readStorage(STORAGE_KEYS.currency, 'INR'),
  )
  const [exchangeRates, setExchangeRates] = useState({})
  const [ratesLoading, setRatesLoading] = useState(true)
  const [ratesError, setRatesError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.budget, JSON.stringify(monthlyBudget))
  }, [monthlyBudget])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currency, JSON.stringify(preferredCurrency))
  }, [preferredCurrency])

  useEffect(() => {
    let active = true

    async function loadRates() {
      setRatesLoading(true)
      setRatesError('')

      try {
        const rates = await fetchCurrencyRates('INR')

        if (active) {
          setExchangeRates(rates)
        }
      } catch {
        if (active) {
          setRatesError('Currency conversion is unavailable right now.')
        }
      } finally {
        if (active) {
          setRatesLoading(false)
        }
      }
    }

    loadRates()

    return () => {
      active = false
    }
  }, [])

  const addTransaction = useCallback((transaction) => {
    const nextTransaction = {
      ...transaction,
      id: uuidv4(),
      amount: Number(transaction.amount),
      recurring: Boolean(transaction.recurring),
      date: transaction.date,
    }

    setTransactions((currentTransactions) => [nextTransaction, ...currentTransactions])
    return nextTransaction
  }, [])

  const updateTransaction = useCallback((transactionId, transaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((item) =>
        item.id === transactionId
          ? {
              ...item,
              ...transaction,
              amount: Number(transaction.amount),
              recurring: Boolean(transaction.recurring),
            }
          : item,
      ),
    )
  }, [])

  const deleteTransaction = useCallback((transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId),
    )
  }, [])

  const clearAllData = useCallback(() => {
    setTransactions([])
  }, [])

  const summary = useMemo(
    () => calculateSummary(transactions, monthlyBudget),
    [transactions, monthlyBudget],
  )

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      monthlyBudget,
      setMonthlyBudget,
      preferredCurrency,
      setPreferredCurrency,
      exchangeRates,
      ratesLoading,
      ratesError,
      summary,
      clearAllData,
    }),
    [
      addTransaction,
      clearAllData,
      deleteTransaction,
      exchangeRates,
      monthlyBudget,
      preferredCurrency,
      ratesError,
      ratesLoading,
      summary,
      transactions,
      updateTransaction,
    ],
  )

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export { FinanceContext }