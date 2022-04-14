import {axisBottom, AxisScale, select} from "d3"
import {useEffect, useRef}             from "react"

type Props = {
  position: "left" | "bottom" | "top" | "right"
  left?: number
  top?: number
  scale: AxisScale<any>
}

export const Axis = ({position, left = 0, top = 0, scale}: Props) => {
  const ref = useRef<SVGGElement>(null)

  useEffect(() => {
    select<SVGGElement, unknown>(ref.current!)
      .call(axisBottom(scale))
  }, [])

  return <g ref={ref} transform={`translate(${left}, ${top})`}/>
}

export const AxisLeft = () => {
}

export const AxisBottom = () => {
}
