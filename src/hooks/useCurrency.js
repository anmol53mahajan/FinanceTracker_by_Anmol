import { useContext } from 'react'
import { FinanceContext } from '../context/FinanceContext.jsx'
import { convertMoney, currencyOptions, formatMoney } from '../utils/currencyFormatter.js'

export default function useCurrency() {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error('useCurrency must be used within FinanceProvider')
  }

  const { preferredCurrency, setPreferredCurrency, exchangeRates } = context

  const formatCurrency = (amount, currency = preferredCurrency) => {
    const convertedAmount = convertMoney(amount, currency, exchangeRates)
    return formatMoney(convertedAmount, currency)
  }

  return {
    currencyOptions,
    preferredCurrency,
    setPreferredCurrency,
    exchangeRates,
    formatCurrency,
  }
}