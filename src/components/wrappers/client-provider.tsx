'use client'

import React from 'react'

import { AppDataProvider } from '@/context/app-data.context'

const ClientSideProviders = ({ children }: { children: React.ReactNode }) => {
  return <AppDataProvider>{children}</AppDataProvider>
}

export default ClientSideProviders
