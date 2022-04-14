import {useSvgSize}                                 from "@/hooks"
import {interpolateRgb, scaleBand, scaleSequential} from "d3"
import {Fragment}                                   from "react"
import raw                                          from "../json/heat.json"

type Data = {
  gene: string
  sample: string
  p: number
}

type HeatChartProps = {
  data?: Data[]
  genes: string[]
  sample: string
}

export const HeatChart = ({data = raw, genes, sample}: HeatChartProps) => {
  const margin                = {left: 40, right: 20, top: 20, bottom: 50},
        {w, h, width, height} = useSvgSize(500, 510, margin)

  const x             = scaleBand<string>()
          .domain(new Set(data?.map(d => d.gene)))
          .range([0, width])
          .padding(0.05),
        y             = scaleBand<string>()
          .domain(new Set(data?.map(d => d.sample)))
          .range([height, 0])
          .padding(0.05),
        negativeColor = scaleSequential<number>()
          .domain([-1, 0])
          .interpolator(interpolateRgb("#12c4dc", "#fff")),
        positiveColor = scaleSequential<number>()
          .domain([0, 1])
          .interpolator(interpolateRgb("#fff", "#ec1536"))

  // useEffect(() => {
  //   const res = []
  //   for (let i = 0; i < 10; i++) {
  //     for (let j = 0; j < 10; j++) {
  //       res.push({
  //         gene: `gene-${i}`,
  //         sample: `sample-${j}`,
  //         p: randomUniform(-1, 1)()
  //       })
  //     }
  //   }
  //   console.log(res)
  // }, [])

  return <div className={"relative"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data?.map((d, i) => {
          const {gene, sample, p} = d
          return <Fragment key={`${gene}-${sample}`}>
            <rect
              x={x(gene)}
              y={y(sample)}
              width={x.bandwidth()}
              height={y.bandwidth()}
              fill={p > 0
                ? positiveColor(p)
                : negativeColor(p)}
            />
            {[81, 63, 99].includes(i) &&
              <circle
                cx={x(gene)! + x.bandwidth() / 2}
                cy={y(sample)! + y.bandwidth() / 2}
                r={10}
                fill={"#9f8bfa"}
              />}
          </Fragment>
        })}
      </g>
    </svg>
  </div>
}
