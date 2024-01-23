import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function get(url: string) {
  const resp = await fetch(url)
  const json = await resp.json()
  return json
}
