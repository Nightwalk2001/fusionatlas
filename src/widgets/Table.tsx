import {motion} from "framer-motion"
import React    from "react"

type TableProps = {
  tableClass?: string
  children: React.ReactNode
}

export const Table = ({tableClass, children}: TableProps) =>
  <motion.div
    className={`table-container ${tableClass}`}>
    <table className={"table"}>{children}</table>
  </motion.div>

type TheadProps = {
  headers: string[]
}

export const Thead = ({headers}: TheadProps) => {
  return <thead>
    <tr>
      {headers.map(d => <th key={d} scope={"col"} className={"th"}>{d}</th>)}
    </tr>
  </thead>
}
