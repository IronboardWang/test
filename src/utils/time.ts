export const isSameDay = (timestamp1: number | string, timestamp2: number | string) => {
  if (!timestamp1 || !timestamp2) return false
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)

  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}

export const getTimePeriod = (): string => {
  const currentDate = new Date()
  const hours = currentDate.getHours()

  if (hours < 12) {
    return '上午'
  } else {
    return '下午'
  }
}
