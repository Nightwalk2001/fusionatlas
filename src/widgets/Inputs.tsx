import React from "react"

type InputProps = {
  type: "text" | "email" | "password"
}


export const Input: React.FC<InputProps> = ({type}) => {
  return <input/>
}
