import { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext.jsx'

export default function useBudget() {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error('useBudget must be used within FinanceProvider')
  }

  const { monthlyBudget, setMonthlyBudget, summary } = context

  return {
    monthlyBudget,
    setMonthlyBudget,
    summary,
  }
}