export const Button = ({ children, variant = "primary", size = "medium", className = "", ...props }) => {
    const baseClasses = "font-medium rounded focus:outline-none transition-colors"
  
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
    }
  
    const sizeClasses = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg",
    }
  
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }
  
  