// Format price with commas
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(price).replace('BDT', '৳')
}

// Truncate long text
export const truncate = (text, length = 50) => {
  return text.length > length ? `${text.substring(0, length)}...` : text
}