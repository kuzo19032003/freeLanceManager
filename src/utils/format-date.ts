// utils/format-date.ts
function getOrdinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`

  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

export function formatDateFancy(dateString: string): string {
  const date = new Date(dateString)

  const day = getOrdinal(date.getDate())
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}
