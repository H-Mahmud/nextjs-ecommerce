const CURRENTCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENTCY_FORMATTER.format(amount);
}

export const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});
