export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr) // input is UTC
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(d)
}
