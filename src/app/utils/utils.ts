export function ToFahrenheit(celsius: number): number {
  const fahrenheit = celsius * (9 / 5) + 32;
  return Number(Math.round(fahrenheit));
}

export function convertTime(dateString: string): string {
  const date = new Date(dateString);
  const timeString = date.toLocaleTimeString([], { timeStyle: 'short' });
  return timeString.replace(/\s[APap][mM]$/, '');
}
