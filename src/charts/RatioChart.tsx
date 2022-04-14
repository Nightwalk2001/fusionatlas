import {scaleLinear, scaleOrdinal} from "d3"
import {Fragment}                  from "react"

type Props = {
  width?: number
  height?: number
  left?: number
  padding?: number
  name: string
  data: {
    name: string
    value: number
  }[]
}

export const RatioChart = ({width = 500, height = 30, left = width * 0.2, padding = 3, name, data}: Props) => {
  const total = data.reduce((prev, curren) => prev + curren.value, 0)

  const x     = scaleLinear()
          .domain([0, 400])
          .range([0, width]),
        color = scaleOrdinal<string>()
          .domain(data.map(d => d.name))
          .range(["#67b7dc", "#8067dc", "#fc5d76"])

  return <div className={`flex justify-evenly items-center w-[600px]`}>
    <span className={"text-sm text-gray-500 font-medium uppercase"}>{name}</span>
    <svg width={width} height={height}>
      {data.map((d, i) => {
        let prev = 0
        for (let j = 0; j < i; j++) prev += data[j].value

        const start = x(prev),
              width = x(d.value) - 2

        return <Fragment key={d.name}>
          <rect
            x={start}
            width={width}
            height={height}
            rx={3}
            fill={color(d.name)}
            fillOpacity={0.85}
            // whileHover={{scale: 1.025}}
          />
          <text
            x={start + width / 2}
            y={height / 2}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            className={"font-mono font-semibold text-sm fill-white"}>
            {d.name}:{(d.value / total * 100).toFixed(1)}%
          </text>
        </Fragment>
      })}
    </svg>
  </div>
}
