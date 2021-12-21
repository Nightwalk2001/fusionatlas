import React, {MouseEventHandler} from "react"

type LayoutProps = {
  children: React.ReactNode[]
  className: string
  onClick: MouseEventHandler<HTMLDivElement>
}

export const Row: React.FC<LayoutProps> = ({children, className, onClick}) =>
  <div className={`flex flex-row ${className}`} onClick={onClick}>
    {children}
  </div>


export const Column: React.FC<LayoutProps> = ({children, className, onClick}) =>
  <div className={`flex flex-row ${className}`} onClick={onClick}>
    {children}
  </div>
