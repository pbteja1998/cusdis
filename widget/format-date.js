export const formatDate = (
  input,
) => {
  const date = new Date(input)
  const monthLocale = date.toLocaleString('en-US', { month: 'short' })
  return `${monthLocale} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}