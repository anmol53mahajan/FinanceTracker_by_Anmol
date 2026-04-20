const DEFAULT_CURRENCY = 'INR'

export const currencyOptions = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD']

export function formatMoney(amount, currency = DEFAULT_CURRENCY) {
  const numericAmount = Number(amount) || 0

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(numericAmount)
  } catch {
    return `${currency} ${numericAmount.toLocaleString('en-IN')}`
  }
}

export function convertMoney(amount, currency = DEFAULT_CURRENCY, rates = {}) {
  const numericAmount = Number(amount) || 0

  if (currency === DEFAULT_CURRENCY) {
    return numericAmount
  }

  const rate = rates?.[currency]

  if (!rate) {
    return numericAmount
  }

  return numericAmount * rate
}