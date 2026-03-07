import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  children: ReactNode
}

export default function Button({ 
  variant = "primary", 
  children, 
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300"
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-black text-white hover:bg-gray-900",
    outline: "border-2 border-white text-white hover:bg-white hover:text-black",
    ghost: "text-white hover:bg-white/10"
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
