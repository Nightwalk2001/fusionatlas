import {useSvgSize}                           from "@/hooks"
import phe                                    from "@/json/phe.json"
import {chordColors, stat}                    from "@/libs"
import {AxisBottom, AxisLeft}                 from "@visx/axis"
import {GridColumns}                          from "@visx/grid"
import {scaleBand, scaleLinear, scaleOrdinal} from "d3"
import React                                  from "react"

const raw = phe as [string, number[], number[]][]

type BoxChartProps = {
  data?: [string, number[], (number[] | string[])][]
}

type BoxProps = {
  group: string
  offset: number
  numbers: number[]
  stroke: string
}

export const PheChart = ({data = raw}: BoxChartProps) => {
  const margin                = {left: 60, right: 10, top: 50, bottom: 60},
        {w, h, width, height} = useSvgSize(720, 470, margin)

  const groups = data?.map(d => d[0])

  const x        = scaleBand<string>()
          .domain(groups)
          .range([0, width])
          .paddingInner(4)
          .paddingOuter(.5)
          .round(true),
        // .round(true),
        boxWidth = 18,
        winWidth = 4

  const numbers = data?.map(d => [...d[1], ...d[2]])

  const y = scaleLinear()
    // .domain(extent(numbers) as [number, number])
    .domain([12, 22])
    .range([height, 0])
    .nice()

  const stroke = scaleOrdinal<string, string>()
    .domain(groups)
    .range(chordColors)

  const Box = ({group, offset, numbers, stroke}: BoxProps) => {
    const {min, max, median, q1, q3, outliers} = stat(numbers)
    return <g transform={`translate(${offset}, 0)`}>
      <line x1={x(group)!} x2={x(group)!} y1={y(min)} y2={y(q1)}
            stroke={stroke} strokeWidth={1.1}/>
      <line x1={x(group)!} x2={x(group)!} y1={y(max)} y2={y(q3)}
            stroke={stroke} strokeWidth={1.1}/>
      <rect x={x(group)! - boxWidth / 2} y={y(q3)} width={boxWidth} height={y(q1) - y(q3)} rx={1.5}
            fill={stroke} fillOpacity={0.55} stroke={stroke} strokeWidth={1} strokeOpacity={0.8}/>
      <line x1={x(group)! - boxWidth / 2} x2={x(group)! + boxWidth / 2} y1={y(median)} y2={y(median)}
            stroke={stroke} strokeWidth={0.95}/>
      <line x1={x(group)! - winWidth} x2={x(group)! + winWidth} y1={y(max)} y2={y(max)}
            stroke={stroke} strokeWidth={1.3}/>
      <line x1={x(group)! - winWidth} x2={x(group)! + winWidth} y1={y(min)} y2={y(min)}
            stroke={stroke} strokeWidth={1.3}/>
    </g>
  }

  return <div className={"relative ml-10 my-20 w-fit font-roma"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft
          scale={y}
          hideTicks
          hideAxisLine
          tickLabelProps={() => ({
            fontFamily: "Times New Roman",
            fontSize: 12,
            textAnchor: "end",
            fill: "#606162"
          })}
          label={"MPL_exp"}
          labelOffset={35}
          labelProps={{
            fontFamily: "Times New Roman",
            fontSize: 14,
            fontWeight: "bold",
            textAnchor: "middle",
            fill: "#606162"
          }}
        />
        <AxisBottom
          scale={x}
          top={height}
          // hideTicks
          hideAxisLine
          tickStroke={"#b4b6b7"}
          tickLineProps={{
            strokeWidth: 0.7,
            strokeOpacity: 0.8
          }}
          tickLabelProps={() => ({
            fontFamily: "Times New Roman",
            fontSize: 13,
            textAnchor: "middle",
            fill: "#474849"
          })}
          label={"leukemia_french_american_british_morphology_code"}
          labelOffset={15}
          labelProps={{
            fontFamily: "Times New Roman",
            fontSize: 14,
            fontWeight: "bold",
            textAnchor: "middle",
            fill: "#606162"
          }}
        />
        <GridColumns height={height} scale={x}/>
        <line x1={0} y1={0} x2={0} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>
        <line x1={0} y1={height} x2={width} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>

        {data.map((d, i) => {

          return <React.Fragment key={d[0]}>
            {/*{data.map((d, d[0) => d.map(c => {*/}
            {/*  return <circle*/}
            {/*    key={`${c}-${d[0}`}*/}
            {/*    cx={x(d[0)! + randomUniform(-65, 65)()}*/}
            {/*    cy={y(c)}*/}
            {/*    r={1.35}*/}
            {/*    fill={fill(d[0)}*/}
            {/*    fillOpacity={0.7}*/}
            {/*  />*/}
            {/*}))}*/}
            <Box group={d[0]} offset={-16} numbers={d[1]} stroke={"#44d7cb"}/>

            {
              d[2].length > 4
                ? <Box group={d[0]} offset={16} numbers={d[2] as number[]} stroke={"#a638d2"}/>
                : (d[2] as number[]).map((di: number, ii: number) =>
                  <circle
                    key={`circle-${i}-${ii}`}
                    cx={x(d[0])! + 16}
                    cy={y(di)}
                    r={2.1}
                    fill={"#a638d2"}
                    // fillOpacity={0.7}
                    // stroke={stroke(d[0])}
                    // strokeOpacity={0.3}
                    // strokeWidth={0.3}
                  />)
            }

          </React.Fragment>
        })}
      </g>
    </svg>

    <div className={"absolute -top-3 left-[320px] text-xl text-gray-700 font-medium font-roma"}
         style={{fontFamily: "Times New Roman"}}>
      TCGA-LAML
    </div>
  </div>
}
