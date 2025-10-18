import React, { useState, useRef, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
}

export function ImageWithFallback({ 
  priority = false, 
  placeholder, 
  sizes = '100vw',
  ...props 
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(priority)
  const [currentSrc, setCurrentSrc] = useState(placeholder || props.src)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  // Загружаем реальное изображение когда элемент в viewport
  useEffect(() => {
    if (isInView && currentSrc === placeholder && props.src) {
      setCurrentSrc(props.src)
    }
  }, [isInView, currentSrc, props.src, placeholder])

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} ref={imgRef}>
      {isLoading && !didError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {didError ? (
        <div className="inline-block bg-gray-100 text-center align-middle w-full h-full flex items-center justify-center">
          <img 
            src={ERROR_IMG_SRC} 
            alt="Error loading image" 
            {...rest} 
            data-original-url={src}
            className="opacity-50"
          />
        </div>
      ) : (
        <img 
          src={currentSrc} 
          alt={alt} 
          className={`transition-all duration-500 ease-out ${
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{
            ...style,
            willChange: isLoading ? 'opacity, transform' : 'auto',
          }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onError={handleError}
          onLoad={handleLoad}
          {...rest} 
        />
      )}
    </div>
  )
}
