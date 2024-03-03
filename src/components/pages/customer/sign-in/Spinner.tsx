'use client'
import React, { useState, useEffect } from 'react'

const Spinner = () => {
  const [isVisible, setIsVisible] = useState(true)

  // Use useEffect to hide the loading spinner after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      {isVisible && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-white opacity-75">
          <div className="mt-[50vh] flex items-center justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
              <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blackDark"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Spinner
