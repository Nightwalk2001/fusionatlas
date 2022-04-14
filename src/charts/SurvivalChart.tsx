import {useSvgSize}                   from "@/hooks"
import del                            from "@/json/del.json"
import p                              from "@/json/p.json"
import {AxisBottom, AxisLeft}         from "@visx/axis"
import {curveStep, line, scaleLinear} from "d3"
import React                          from "react"

type Datum = {
  time: number
  count: number
}

export const SurvivalChart = () => {
  const margin                = {left: 50, right: 10, top: 30, bottom: 30},
        {w, h, width, height} = useSvgSize(800, 560, margin)

  const x         = scaleLinear()
          .domain([0, 3000])
          .range([0, width]),
        y         = scaleLinear()
          .domain([0, 1])
          .range([height, 0]),
        lineFnDel = line<Datum>().x(d => x(d.time)).y(d => y(d.count / 102)).curve(curveStep),
        lineFnP   = line<Datum>().x(d => x(d.time)).y(d => y(d.count / 30)).curve(curveStep)

  return <div className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideAxisLine
          tickLabelProps={() => ({
            fontFamily: "Times New Roman",
            fontSize: 12.5,
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
            fontSize: 15,
            textAnchor: "middle",
            fill: "#474849"
          })}/>
        <line x1={0} y1={0} x2={0} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>
        <line x1={0} y1={height} x2={width} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>
        <path d={lineFnDel(del)!} fill={"transparent"} stroke={"#42d8ee"}
              strokeWidth={1.4} strokeDasharray={"3 2"}/>
        <path d={lineFnP(p)!} fill={"transparent"} stroke={"#d52cb3"}
              strokeWidth={1.4} strokeDasharray={"3 2"}/>
      </g>
    </svg>
  </div>
}
