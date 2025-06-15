import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface QuoteAPIResponse {
  id: number
  quote: string
  author: string
}

export const DEFAULT_QUOTE = {
  author: 'System',
  id: 234,
  quote:
    'hard small need just last for can city under she sometimes at so then they family you life other air close life think through always how day find cut'
}

export async function getRandomQuote(): Promise<QuoteAPIResponse> {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random')

    const quote = await response?.json()

    return quote
  } catch {
    return DEFAULT_QUOTE
  }
}
