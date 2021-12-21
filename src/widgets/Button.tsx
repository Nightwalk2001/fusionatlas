import React, {HTMLProps} from "react"

type ButtonProps = {
  children: React.ReactNode | string
} & HTMLProps<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  const {className, onClick} = rest
  return <button className={`rounded-md ${className}`} onClick={onClick}>{children}</button>
}
