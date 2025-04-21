"use client"

import { useState, useEffect } from "react"

interface TextAnimationProps {
  text: string
  className?: string
  speed?: number
  onComplete?: () => void
}

export function TextAnimation({
  text,
  className = "",
  speed = 10, // Very fast typing speed (10ms)
  onComplete,
}: TextAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    setDisplayedText("")
    setIsComplete(false)

    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index))
        index++
      } else {
        clearInterval(intervalId)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed, onComplete])

  return (
    <div className={`whitespace-pre-wrap ${className}`}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  )
} 