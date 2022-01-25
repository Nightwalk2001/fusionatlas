import {motion} from "framer-motion"
import React, {memo} from "react"

type GeneArrowProps = {
  x: number
  w?: number
  h: number
  h1?: number
  h2?: number
  fill: string
}

export const GeneArrow: React.FC<GeneArrowProps> = memo(({
                                                           x,
                                                           w = 2.5,
                                                           h,
                                                           h1 = 3,
                                                           h2 = 5,
                                                           fill
                                                         }) =>
  <motion.polygon
    animate={{opacity: [0, 1], transition: {delay: 1}}}
    points={`
              ${x},${h - h1}
              ${x + w},${h - h1}
              ${x + w},${h - h2}
              ${x + w * 2},${h},
              ${x + w},${h + h2},
              ${x + w},${h + h1},
              ${x},${h + h1}
              `}
    fill={fill}
  />)