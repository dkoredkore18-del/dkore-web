import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden ${
        hover ? "hover:shadow-2xl hover:scale-105 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
