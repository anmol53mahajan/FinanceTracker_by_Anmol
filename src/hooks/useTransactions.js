import { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext.jsx'

export default function useTransactions() {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error('useTransactions must be used within FinanceProvider')
  }

  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearAllData,
  } = context

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearAllData,
  }
}