import React from 'react'

import ClientSideProviders from './client-provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ClientSideProviders>{children}</ClientSideProviders>
}

export default Providers
