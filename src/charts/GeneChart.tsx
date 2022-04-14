import {useSvgSize}                                                                                      from "@/hooks"
import {chordColors}                                                                                     from "@/libs"
import {
  AxisBottom,
  AxisLeft
}                                                                                                        from "@visx/axis"
import {interpolateRgbBasis, max, scaleBand, scaleLinear, scaleLog, scaleOrdinal, scaleSequentialSymlog} from "d3"
import {useEffect}                                                                                       from "react"
import multi
                                                                                                         from "../json/multi.json"

type Props = {
  gtex: Lnc[]
  tcga: Lnc[]
  chunkCount?: number
  spacing?: number
}

export const SingleGeneChart = ({gtex, tcga, chunkCount = 18, spacing = 5}: Props) => {
  const margin                = {left: 40, right: 20, top: 20, bottom: 50},
        {w, h, width, height} = useSvgSize(800, 510, margin)

  const chunkSize = Math.ceil(Math.max(gtex.length, tcga.length) / chunkCount / 100) * 100

  const x     = scaleLinear()
          .domain([0, chunkSize])
          .range([0, (width / chunkCount) - spacing])
          .nice(),
        y     = scaleLog()
          .base(2)
          .domain([1, Math.log2(
            Math.max(
              max(tcga, d => d.value) ?? 1,
              max(gtex, d => d.value) ?? 1
            ))])
          .range([height, 0])
          .nice(),
        color = scaleOrdinal<number, string>()
          .range(chordColors)

  useEffect(() => {

  })

  const partitionData = (arr: Lnc[]) => {
    const chunkedData: Lnc[][] = []

    for (let i = 0; i < chunkCount; i++)
      chunkedData.push(arr.slice(chunkSize * i,
        i === chunkCount - 1
          ? arr.length - 1
          : chunkSize * (i + 1))
        .sort((a, b) => a.value - b.value)
      )
    return chunkedData
  }

  const normals = partitionData(gtex),
        tumors  = partitionData(tcga)

  return <div className={"ml-10"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft scale={y}/>
        <line x1={0} y1={height} x2={width} y2={height} stroke={"#b4b6b8"}/>
        {normals && normals.map((g, id) => g.map((d, i) => <circle
          key={d.sample}
          transform={`translate(${width / chunkCount * id}, 0)`}
          cx={x(i)}
          cy={y(Math.log2(d.value)) || height}
          r={[3456, 2346, 2260].includes(i) ? 5 : 1.5}
          // className={"fill-rose-400"}
          fill={color(id)}
        />))}
        {tumors && tumors.map((g, id) => g.map((d, i) => <circle
          key={d.sample}
          transform={`translate(${width / chunkCount * id}, 0)`}
          cx={x(i)}
          cy={y(Math.log2(d.value)) || height}
          r={[3456, 2346, 2260].includes(i) ? 5 : 1.5}
          // className={"fill-rose-400"}
          fill={color(id)}
        />))}
        {/*{data.map((d, i) =>*/}
        {/*  <circle*/}
        {/*    key={d.sample}*/}
        {/*    cx={x(i)}*/}
        {/*    cy={y(Math.log2(d.value)) || height}*/}
        {/*    r={[3456, 2346, 2260].includes(i) ? 5 : 1.5}*/}
        {/*    className={"fill-rose-400"}*/}
        {/*  />)}*/}
      </g>
    </svg>
  </div>
}

export const MultiGeneChart = () => {
  const margin                = {left: 40, right: 20, top: 20, bottom: 50},
        {w, h, width, height} = useSvgSize(500, 510, margin)

  const xs = [...new Set(multi.map(i => i.gene)), "Type"],
        ys = Array
          .from(new Set(multi.map(i => i.sample)))
          .sort(() => Math.random() - 0.5)

  const x     = scaleBand()
          .domain(xs)
          .range([0, width])
          .padding(0.05),
        y     = scaleBand()
          .domain(ys)
          .range([height, 0])
          .padding(0.05),
        color = scaleSequentialSymlog()
          .interpolator(interpolateRgbBasis(["#ecf4f6", "#03c6f1"]))


  const isTumor = (sample: string) => multi.find(d => d.sample === sample)?.type === "tumor"


  return <div>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft scale={y} hideAxisLine hideTicks/>
        <AxisBottom top={height} scale={x} hideAxisLine hideTicks numTicks={15}/>
        {multi.map(d =>
          <rect
            key={`${d.gene}-${d.sample}`}
            x={x(d.gene)}
            y={y(d.sample)}
            width={x.bandwidth()}
            height={y.bandwidth()}
            fill={color(d.value)}
          />)}
        {ys.map(d =>
          <rect
            key={d}
            x={x("Type")}
            y={y(d)}
            width={x.bandwidth()}
            height={y.bandwidth()}
            fill={isTumor(d) ? "#a7bbee" : "#fabd76"}
          />)}
      </g>
    </svg>
  </div>
}
