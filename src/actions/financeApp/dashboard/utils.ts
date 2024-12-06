import Decimal from 'decimal.js'

export function calculatePercentageChange(current: Decimal, previous: Decimal) {
  if (previous.equals(0)) {
    return previous.equals(current) ? 0 : 100
  }

  return current.minus(previous).dividedBy(previous).plus(100)
}
