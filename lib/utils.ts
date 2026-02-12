import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "DOP"): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string, format: "short" | "long" | "full" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    short: { year: "numeric", month: "2-digit", day: "2-digit" },
    long: { year: "numeric", month: "long", day: "numeric" },
    full: { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" },
  }[format]
  
  return new Intl.DateTimeFormat("es-DO", options).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("es-DO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length) + "..."
}

export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber
  const last4 = accountNumber.slice(-4)
  const masked = "*".repeat(accountNumber.length - 4)
  return masked + last4
}

export function maskCardNumber(cardNumber: string): string {
  if (cardNumber.length !== 16) return cardNumber
  return `${cardNumber.substring(0, 4)} **** **** ${cardNumber.substring(12)}`
}

export function getInitials(name: string): string {
  const names = name.split(" ")
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase()
  return (names[0][0] + names[names.length - 1][0]).toUpperCase()
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
