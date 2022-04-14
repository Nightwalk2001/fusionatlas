import {useSvgSize}                      from "@/hooks"
import proximal                          from "@/json/proximal.json"
import {AxisBottom, AxisLeft}            from "@visx/axis"
import {line, scaleLinear, scaleOrdinal} from "d3"
import React, {useEffect}                from "react"

type Datum = {
  type: string
  value: number
}

type Data = {
  group: string
  values: Datum[]
}[]

const groups = ["Background genes", "Shorten genes", "Lengthen genes"]

export const PeakChart = () => {
  const margin                = {left: 40, right: 10, top: 60, bottom: 30},
        {w, h, width, height} = useSvgSize(690, 450, margin)

  useEffect(() => {
  }, [])

  const x      = scaleLinear().domain([-210, 210]).range([0, width]),
        y      = scaleLinear().domain([-0.01, 0.2]).range([height, 0]).nice(),
        lineFn = line<Datum>().x((_, i) => x(i - 200)).y(d => y(d.value)),
        color  = scaleOrdinal<string>()
          .domain(groups)
          .range(["#8bedfa", "#f65764", "#9595f8"])

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
          labelOffset={35}
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
        {proximal.map((d) =>
          <path
            key={d.group}
            d={lineFn(d.values)!}
            stroke={color(d.group)}
            strokeWidth={1.5}
            fill={"transparent"}
          />)}
      </g>
    </svg>

    <div className={"absolute right-12 top-16 flex flex-col space-y-2 w-48 font-roma"}>
      {groups.map(d =>
        <div key={d} className={"flex items-center space-x-2"}>
          <div className={"w-14 h-[2.5px]"} style={{backgroundColor: color(d)}}/>
          <span className={"text-sm text-gray-600"}>{d}</span>
        </div>)}
    </div>
  </div>
}
