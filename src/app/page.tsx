'use client'

import { useRouter } from 'next/navigation'

import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

import { HexagonBackground } from '@/components/animate-ui/backgrounds/hexagon'
import { LiquidButton } from '@/components/animate-ui/buttons/liquid'
import { TypingText } from '@/components/animate-ui/text/typing'

export default function Home() {
  const router = useRouter()

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen p-6'>
      <HexagonBackground className='absolute z-1 inset-0 flex items-center justify-center rounded-xl' />
      <TypingText
        className='text-5xl md:text-6xl z-10 leading-28 font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'
        text='Typing Speed Test'
        cursor
        duration={80}
        cursorClassName='h-14 ml-2'
      />

      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='z-10'
      >
        <LiquidButton
          variant='default'
          size='lg'
          className='text-lg px-8 py-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500'
          onClick={() => router?.push('/test')}
        >
          <Sparkles className='mr-3 h-5 w-5' /> Get Started
        </LiquidButton>
      </motion.div>
    </div>
  )
}
