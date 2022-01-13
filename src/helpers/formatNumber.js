export default function formatNumber(value) {
  return Intl.NumberFormat().format(value);
}
