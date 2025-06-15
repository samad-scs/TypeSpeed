import React from 'react'

import * as motion from 'motion/react-client'

const TemplatePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {children}
    </motion.div>
  )
}

export default TemplatePage
