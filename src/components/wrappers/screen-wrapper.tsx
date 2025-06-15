// ** React Imports
import React from 'react'

const ScreenWrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`mx-auto h-full w-full max-w-[990px] px-4 md:px-20 ${className}`}>{children}</div>
}

export default ScreenWrapper
