import { useState, useEffect } from 'react'

export default function TypeWriter ({ 
  strings, 
  colorClass,
  headingCls }) {
  const [typedString, setTypedString] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isWordComplete, setIsWordComplete] = useState(false)

  useEffect(() => {
  const interval = setInterval(() => {
    if (isTyping) {
      setTypedString(strings[currentIndex].substring(0, typedString.length + 1))
      if (typedString.length + 1 === strings[currentIndex].length) {
        setIsTyping(false)
        setIsWordComplete(true)
      }
    } else {
      if (isWordComplete) {
        setIsWordComplete(false)
        setTypedString('')
        setCurrentIndex((currentIndex + 1) % strings.length)
        setIsTyping(true)
      } else {
        setTypedString(strings[currentIndex].substring(0, typedString.length - 1))
        if (typedString.length === 0) {
          setIsTyping(true)
        }
      }
    }
  }, isWordComplete ? 1000 : 100)

    return () => clearInterval(interval)
  }, [typedString, currentIndex, isTyping, isWordComplete, strings])

  return (
    <div style={{
      display: "inline-block",
    }}>
      <span className={`${colorClass} headingCls`}>{typedString}</span>
      <span className={`${colorClass} headingCls cursor-blink`}>|</span>
      {/* <span className="cursor-blink">|</span> */}
    </div>
  )
}
