'use client'

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { DEFAULT_QUOTE, QuoteAPIResponse, getRandomQuote } from '@/lib/utils'

type AppData = {
  quote: string
  author: string
  isLoading: boolean
  refetch: () => void
}

const defaultProvider = {
  quote: '',
  author: 'System',
  isLoading: true,
  refetch: () => {}
}

const AppDataContext = createContext<AppData>(defaultProvider)

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [quote, setQuote] = useState<QuoteAPIResponse>(DEFAULT_QUOTE)
  const [isLoading, setIsLoading] = useState(true)

  const fetchQuote = async () => {
    setIsLoading(true)
    const response = await getRandomQuote()
    setQuote(response)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <AppDataContext.Provider
      value={{
        quote: quote.quote,
        author: quote.author,
        isLoading,
        refetch: fetchQuote
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider')
  }
  
  return context
}
