import {arc, pie, PieArcDatum, scaleOrdinal, sum} from "d3"
import {motion}                                   from "framer-motion"
import React, {Fragment, useState}                from "react"

type Data = [string, number]

type PieChartProps = {
  data: { [key: string]: number }
  width?: number
  height?: number
  margin?: number
  padAngle?: number
  innerRadius?: number
  outerRadius?: number
  cornerRadius?: number
  colors?: string[]
  opacity?: number
  hoverScale?: number
  hoverOpacity?: number
  title?: string
}

const defaultColors = [
  "rgb(87,215,236)",
  "rgb(62,238,211)",
  "rgb(236,119,199)",
  "rgb(236,55,97)",
  "rgba(255,211,12,0.88)",
  "rgba(126,10,241,0.5)",
  "rgba(229,53,255,0.9)"
]

export const PieChart = ({
                           data,
                           width = 400,
                           height = 400,
                           margin = 35,
                           padAngle = 0.025,
                           innerRadius = 100,
                           outerRadius = Math.min(width, height) / 2 - margin,
                           cornerRadius = 5,
                           colors = defaultColors,
                           opacity = 0.65,
                           hoverScale = 1.03,
                           hoverOpacity = 0.95,
                           title
                         }: PieChartProps) => {
  const [sigma, setSigma] = useState<number>(0)

  const dataReady = Object.entries(data),
        total     = sum(dataReady, d => d[1])

  const pies = pie<Data>().value(d => d[1])(dataReady)

  const arcFn = arc<PieArcDatum<Data>>()
    // .startAngle(d => d.startAngle * sigma)
    // .endAngle(d => d.endAngle * sigma)
    .padAngle(padAngle)
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(d => d.value / total >= 0.1 ? cornerRadius : 0)

  const color = scaleOrdinal<string>().range(colors)

  // useEffect(() => {
  //   // const trans = transition().duration(1300)
  //   //
  //   // trans.tween("height", () => (t: number) => {
  //   //   setSigma(t)
  //   // })
  // }, [])

  return <div className={"flex flex-col items-center justify-between w-fit max-w-6xl my-4"}>
    <h1 className={"text-xl text-gray-700/80 font-semibold uppercase"}>
      {title}
    </h1>

    <div className={"flex items-center justify-between"}>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {pies.map((d, i) =>
            <Fragment key={`${d.startAngle}-${d.endAngle}`}>
              <motion.path
                d={arcFn(d)!}
                fill={color(`${i}`)}
                opacity={opacity}
                whileHover={{scale: hoverScale, opacity: hoverOpacity}}
              />
              <text transform={`translate(${arcFn.centroid(d)})`} textAnchor={"middle"} fill={"#fff"}>
                {d.value / total >= 0.05 && `${Math.round(d.value / total * 100)}%`}
              </text>
            </Fragment>)}
        </g>
      </svg>

      <div className={"flex flex-col place-content-center gap-x-10 gap-y-3"}>
        {dataReady.map((d, i) =>
          <div key={d[0]} className={"flex items-center space-x-3"}>
            <div className={"w-[27px] h-[27px] rounded-sm"} style={{backgroundColor: color(`${i}`)}}/>
            <span className={"text-gray-600 max-w-[260px]"}>{d[0]}</span>
          </div>)}
      </div>
    </div>
  </div>
}
