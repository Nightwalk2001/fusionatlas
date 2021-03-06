import {useSvgSize} from "@/hooks"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {curveNatural, flatGroup, line, scaleLinear, scaleOrdinal} from "d3"
import React from "react"
import peak from "./proximal.json"

type Datum = {
  group: string
  x: number
  y: number
}

type Data = Datum[]

const groups = ["Background genes", "Shorten genes", "Lengthen genes"],
      colors = ["#8bedfa", "#f65764", "#9595f8"]

type Props = {
  data?: Data
}

export const PeakChart = ({data = peak}: Props) => {
  const margin                = {left: 70, right: 10, top: 60, bottom: 30},
        {w, h, width, height} = useSvgSize(690, 450, margin)

  const grouped = flatGroup(data, d => d.group)

  const x      = scaleLinear().domain([-200, 200]).range([0, width]),
        y      = scaleLinear().domain([0, 1]).range([height, 0]).nice(),
        lineFn = line<Datum>().x(d => x(d.x - 199)).y(d => y(d.y)).defined(d => (d.x + 1) % 3 === 0).curve(curveNatural),
        color  = scaleOrdinal<string>()
          .domain(groups)
          .range(colors)

  return <div className={"relative ml-10 w-fit"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideAxisLine
          tickLabelProps={() => ({
            fontFamily: "Times New Roman",
            fontSize: 13.5,
            textAnchor: "end",
            fill: "#606162"
          })}
          label={"MPL gene expression log2(FPKM + 1)"}
          labelOffset={45}
          labelProps={{fontFamily: "Times New Roman", fontSize: 14, textAnchor: "middle", fill: "#606162"}}
        />
        <AxisBottom
          scale={x}
          top={height}
          hideTicks
          hideAxisLine
          tickLabelProps={() => ({
            fontFamily: "Times New Roman",
            fontSize: 13.5,
            textAnchor: "middle",
            fill: "#474849"
          })}/>
        <line x1={0} y1={0} x2={0} y2={height} stroke={"#585859"} strokeWidth={1} strokeOpacity={0.5}/>
        <line x1={0} y1={height} x2={width} y2={height} stroke={"#585859"} strokeWidth={1} strokeOpacity={0.5}/>
        {grouped.map((d) =>
          <path
            key={d[0]}
            d={lineFn(d[1])!}
            stroke={color(d[0])}
            strokeWidth={1.2}
            fill={"transparent"}
          />)}
      </g>
    </svg>

    <div className={"absolute right-10 top-16 flex flex-col space-y-2 w-48 font-roma"}>
      {groups.map(d =>
        <div key={d} className={"flex items-center space-x-2"}>
          <div className={"w-14 h-[2.5px]"} style={{backgroundColor: color(d)}}/>
          <span className={"text-sm text-gray-600"}>{d}</span>
        </div>)}
    </div>
  </div>
}
