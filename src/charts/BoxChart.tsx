import {useSvgSize}                                          from "@/hooks"
import {stat}                                                from "@/libs"
import {AxisBottom, AxisLeft}                                from "@visx/axis"
import {randomUniform, scaleBand, scaleLinear, scaleOrdinal} from "d3"
import React                                                 from "react"
import raw                                                   from "./tcga.json"

type BoxData = {
  signals: number[][]
  p: number
}

type BoxChartProps = {
  data?: {
    "Fusion+": number[]
    "Fusion-": number[]
  }
}

export const BoxChart = ({data = raw}: BoxChartProps) => {
  const margin                = {left: 70, right: 10, top: 60, bottom: 30},
        {w, h, width, height} = useSvgSize(520, 450, margin),
        boxWidth              = 140,
        winWidth              = 30

  const ordinal = scaleOrdinal<number, string>()
    .domain([0, 1])
    .range(["Fusion+", "Fusion-"])

  const x = scaleBand<string>()
    .domain(["Fusion+", "Fusion-"])
    .range([0, width])
    .paddingInner(4)
    .paddingOuter(.5)
    .round(true)

  const xPos = (i: number) => x(ordinal(i))

  const numbers = [...data["Fusion+"], ...data["Fusion-"]]

  const y = scaleLinear()
    // .domain(extent(numbers) as [number, number])
    .domain([12, 24])
    .range([height, 0])
    .nice()

  const fill   = scaleOrdinal<number, string>()
          .domain([0, 1])
          .range(["#8bedfa", "#ca93f8"]),
        stroke = scaleOrdinal<number, string>()
          .domain([0, 1])
          .range(["#53dfec", "#9a60d9"])
  const dataArray = [data["Fusion+"], data["Fusion-"]],
        count     = dataArray.map(d => d.length),
        dataReady = dataArray.map(stat)

  return <div className={"relative ml-10 my-20 w-fit font-roma"}>
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
        {/*<GridRows width={width} scale={y}/>*/}
        <line x1={0} y1={0} x2={0} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>
        <line x1={0} y1={height} x2={width} y2={height} stroke={"#cccfd2"} strokeWidth={0.7} strokeOpacity={0.5}/>

        {dataReady.map((d, i) => {
          const {q1, median, q3, min, max, outliers} = d

          return <React.Fragment key={i}>
            {dataArray.map((d, i) => d.map(c => {
              const yPos = y(c)
              let offset: number
              if (yPos > y(dataReady[i].q3) && yPos < y(dataReady[i].q1))
                offset = Math.random() > 0.5
                  ? randomUniform(-100, -80)()
                  : randomUniform(80, 100)()
              else offset = randomUniform(-80, 80)()

              return <circle
                key={`${c}-${i}`}
                cx={xPos(i)! + randomUniform(-65, 65)()}
                cy={y(c)}
                r={1.35}
                fill={fill(i)}
                fillOpacity={0.7}
              />
            }))}

            <line x1={xPos(i)} x2={xPos(i)} y1={y(min)} y2={y(max)} stroke={stroke(i)} strokeWidth={1.1}/>
            <rect x={xPos(i)! - boxWidth / 2} y={y(q3)} width={boxWidth} height={y(q1) - y(q3)} rx={1.5}
                  fill={"transparent"} fillOpacity={0.4} stroke={stroke(i)} strokeWidth={1}/>
            <line x1={xPos(i)! - boxWidth / 2} x2={xPos(i)! + boxWidth / 2} y1={y(median)} y2={y(median)}
                  stroke={stroke(i)} strokeWidth={0.95}/>
            <line x1={xPos(i)! - winWidth} x2={xPos(i)! + winWidth} y1={y(max)} y2={y(max)}
                  stroke={stroke(i)} strokeWidth={1.3}/>
            <line x1={xPos(i)! - winWidth} x2={xPos(i)! + winWidth} y1={y(min)} y2={y(min)}
                  stroke={stroke(i)} strokeWidth={1.3}/>
            <text x={xPos(i)! + 35} y={y(q1) + 20} textAnchor={"middle"} alignmentBaseline={"central"}
                  fontFamily={"Times New Roman"}
                  className={"text-sm fill-gray-700"}>n = ({count[i]})
            </text>
            {outliers.map(c =>
              <circle
                key={`${i}-${c}`}
                cx={xPos(i)! + randomUniform(-10, 10)()}
                cy={y(c)}
                r={2}
              />)}
            <polyline points={`${xPos(0)},110 ${xPos(0)},17 ${xPos(1)},17 ${xPos(1)},60`}
                      className={"fill-transparent stroke-indigo-200 stroke-[1.2]"}/>

            <text transform={"translate(216,34)scale(0.8)"} textAnchor={"middle"} alignmentBaseline={"middle"}
                  fontFamily={"Times New Roman"} className={"fill-gray-600 text-xl"}>
              pvalue=4.1e-10
            </text>
            {/*<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className={"fill-orange-300"}*/}
            {/*      transform={"translate(210,14)scale(0.8)"}*/}
            {/*      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>*/}
          </React.Fragment>
        })}
      </g>
    </svg>

    <div className={"absolute top-3 left-[262px] text-xl text-gray-700 font-medium font-roma"}
         style={{fontFamily: "Times New Roman"}}>
      AUC
    </div>
  </div>
}
