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

export const RatioChart = ({width = 920, height = 45, left = width * 0.2, padding = 3, name, data}: Props) => {
  const total = data.reduce((prev, curren) => prev + curren.value, 0)

  const x     = scaleLinear()
          .domain([0, total])
          .range([0, width]),
        color = scaleOrdinal<string>()
          .domain(data.map(d => d.name))
          .range(["#6aeee9", "#8067dc", "#ef5970"])

  return <div className={"flex flex-col space-y-3 my-8"}>
    <span className={"text-lg text-gray-700/80 font-semibold uppercase"}>{name}</span>
    <div className={"flex space-x-8"}>
      {
        data.map(d =>
          <div key={d.name} className={"flex space-x-2"}>
            <div className={"w-6 h-6 rounded-sm"} style={{backgroundColor: color(d.name)}}/>
            <div className={"font-medium text-gray-600"}>{d.name}</div>
          </div>)
      }
    </div>
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
            rx={4}
            fill={color(d.name)}
            fillOpacity={0.85}
            // whileHover={{scale: 1.025}}
          />
          <text
            x={start + width / 2}
            y={height / 2}
            textAnchor={width < 70 ? "middle" : "start"}
            alignmentBaseline={width < 70 ? undefined : "middle"}
            className={"font-mono font-semibold text-sm fill-white"}>
            {(d.value / total * 100).toFixed(1)}%
          </text>
        </Fragment>
      })}
    </svg>
  </div>
}
