export default function truncateFilter (value: any, limit = 150) {
  if (value.length > limit) {
    value = value.substring(0, (limit - 3)) + '...'
  }

  return value
}
