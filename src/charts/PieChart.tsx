import {arc, pie, PieArcDatum, scaleOrdinal, sum, transition} from "d3"
import {motion} from "framer-motion"
import React, {useEffect, useState} from "react"

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
  "rgba(24,16,121,0.2)",
  "rgba(229,53,255,0.1)"
]

export const PieChart: React.FC<PieChartProps> = ({
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
                                                  }) => {
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

  useEffect(() => {
    const trans = transition().duration(1300)

    trans.tween("height", () => (t: number) => setSigma(t))
  }, [])

  return <div className={"relative w-fit"}>
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pies.map((d, i) =>
          <React.Fragment key={`${d.startAngle}-${d.endAngle}`}>
            <motion.path
              d={arcFn(d)!}
              fill={color(`${i}`)}
              opacity={opacity}
              whileHover={{scale: hoverScale, opacity: hoverOpacity}}
            />
            <text transform={`translate(${arcFn.centroid(d)})`} textAnchor={"middle"} fill={"#fff"}>
              {d.value / total >= 0.05 && `${Math.round(d.value / total * 100)}%`}
            </text>
          </React.Fragment>)}
      </g>
    </svg>

    <h1 className={"absolute top-0 x-center"}>
      {title}
    </h1>

    <div className={"absolute bottom-0 flex space-x-2.5 x-center"}>
      {dataReady.map((d, i) =>
        <div key={d[0]} className={"flex items-center space-x-1"}>
          <div className={"w-[20px] h-[20px]"} style={{backgroundColor: color(`${i}`)}}/>
          <span className={"text-gray-600"}>{d[0]}</span>
        </div>)}
    </div>
  </div>
}
