import {useSvgSize}               from "@/hooks"
import {minMax}                   from "@/libs"
import {AxisBottom, AxisLeft}     from "@visx/axis"
import {NumberValue, scaleLinear} from "d3"
import {Key}                      from "react"
import useSWR                     from "swr"

type Props = {
  gene: string
  data: any
  normal: {
    sample: string
    value: number
  },
  tumor: {
    sample: string
    value: number
  }
}

export const ScatterChart = ({gene, data}: Props) => {
  const {} = useSWR(`/gene/single/${gene}`)
  const margin                = {left: 40, right: 20, top: 20, bottom: 50},
        {w, h, width, height} = useSvgSize(800, 510, margin)

  const x = scaleLinear()
          .domain([0, data.length - 1])
          .range([0, width]),
        y = scaleLinear()
          .domain(minMax(data, "value"))
          .range([height, 0])

  return <div>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft scale={y}/>
        <AxisBottom top={height} scale={x}/>
        {data.map((d: { sample: Key | null | undefined; value: NumberValue }, i: number) =>
          <circle
            key={d.sample}
            cx={x(i)}
            cy={y(d.value)}
            r={[3456, 2346, 2260].includes(i) ? 5 : 1.5}
            className={"fill-rose-400"}
          />)}
      </g>
    </svg>
  </div>
}