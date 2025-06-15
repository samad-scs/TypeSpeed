'use client'

import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useAppData } from '@/context/app-data.context'
import { RotateCcw, Target, Timer, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function TypingSpeedTest() {
  const { quote, isLoading, author, refetch } = useAppData()

  const [userInput, setUserInput] = useState('')

  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const words = useMemo(() => quote.split(' '), [quote])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    if (!isActive) return
    if (timeLeft === 0) {
      setIsActive(false)
    }
  }, [timeLeft, isActive])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserInput(value)

    if (!isActive && value.length > 0) {
      setIsActive(true)
    }

    const wordsTyped = value.trim().split(/\s+/).filter(Boolean).length

    const timeElapsed = (60 - timeLeft) / 60

    if (timeElapsed > 0 && wordsTyped > 0) {
      setWpm(Math.round(wordsTyped / timeElapsed))
    }

    const correctChars = value.split('').filter((char, index) => char === quote[index]).length

    const accuracyValue = value.length === 0 ? 100 : Math.round((correctChars / value.length) * 100)

    setAccuracy(accuracyValue)

    const errorsCount = value.split('').filter((char, index) => char !== quote[index]).length
    setErrors(errorsCount)

    // End test early if entire quote is typed
    if (value === quote) {
      setIsActive(false)
      setTimeLeft(0)
    }
  }

  const resetTest = () => {
    refetch()
    setUserInput('')
    setTimeLeft(60)
    setIsActive(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    inputRef.current?.focus()
  }

  const renderText = () => {
    return words.map((word, wordIndex) => {
      const isCurrentWord = wordIndex === Math.floor(userInput.trim().split(' ').length - 1)

      return (
        <span key={wordIndex} className='inline-block mr-2 mb-1'>
          {word.split('').map((char, charIndex) => {
            const globalCharIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex
            const userChar = userInput[globalCharIndex]

            let className = 'transition-colors duration-150 '

            if (userChar === undefined) {
              className += 'text-muted-foreground'
            } else if (userChar === char) {
              className += 'text-green-400 bg-green-400/10'
            } else {
              className += 'text-red-400 bg-red-400/10'
            }

            if (isCurrentWord && userInput.length === globalCharIndex) {
              className += ' bg-primary/20 animate-pulse'
            }

            return (
              <span key={charIndex} className={className}>
                {char}
              </span>
            )
          })}
        </span>
      )
    })
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [isLoading])

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl space-y-6'>
        {/* Header Stats */}
        <div className='flex justify-center gap-4'>
          <Badge variant='secondary' className='px-4 py-2 text-lg'>
            <Timer className='w-4 h-4 mr-2' />
            {timeLeft}s
          </Badge>
          <Badge variant='secondary' className='px-4 py-2 text-lg'>
            <Zap className='w-4 h-4 mr-2' />
            {wpm} WPM
          </Badge>
          <Badge variant='secondary' className='px-4 py-2 text-lg'>
            <Target className='w-4 h-4 mr-2' />
            {accuracy}%
          </Badge>
        </div>

        {/* Main Typing Area */}
        <Card className='p-8 bg-card/50 backdrop-blur border-border/50'>
          <div className='space-y-6'>
            {/* Text Display */}
            <div className='text-xl leading-relaxed relative font-mono p-6 bg-muted/30 rounded-lg border border-border/30 min-h-[200px] overflow-hidden'>
              {isLoading ? <>Please wait...</> : renderText()}

              {!isLoading && (
                <p className='absolute text-sm italic font-mono bottom-2 right-4 text-muted-foreground'>~ {author}</p>
              )}
            </div>

            {/* Input Area */}
            <div className='flex gap-4 items-center'>
              <div className='flex-1 relative'>
                <input
                  ref={inputRef}
                  type='text'
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder='Start typing to begin the test...'
                  className='w-full px-4 py-3 text-lg bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 font-mono'
                  disabled={timeLeft === 0 || isLoading}
                  autoFocus
                />
              </div>
              <Button
                onClick={resetTest}
                disabled={isLoading}
                size='lg'
                variant='outline'
                className='px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors'
              >
                <RotateCcw className='w-5 h-5' />
              </Button>
            </div>
          </div>
        </Card>

        {/* Results */}
        {timeLeft === 0 && (
          <Card className='p-5 bg-primary/5 border-primary/20'>
            <div className='text-center space-y-4'>
              <h2 className='text-2xl font-bold text-primary'>Test Complete!</h2>
              <div className='grid grid-cols-3 gap-4 max-w-md mx-auto'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-primary'>{wpm}</div>
                  <div className='text-sm text-muted-foreground'>WPM</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-green-400'>{accuracy}%</div>
                  <div className='text-sm text-muted-foreground'>Accuracy</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-orange-400'>{errors}</div>
                  <div className='text-sm text-muted-foreground'>Errors</div>
                </div>
              </div>
              <Button onClick={resetTest} size='lg' className='mt-4'>
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <div className='text-center text-muted-foreground text-sm'>
          <p>
            Type the text above as accurately and quickly as possible. The test will start automatically when you begin
            typing.
          </p>
        </div>
      </div>
    </div>
  )
}
