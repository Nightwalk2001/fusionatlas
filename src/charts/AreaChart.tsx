import {useSvgSize}                                from "@/hooks"
import stocks                                      from "@/json/aapl_csv.json"
import {AxisBottom, AxisLeft}                      from "@visx/axis"
import {area, extent, max, scaleLinear, scaleTime} from "d3"

const data: { date: Date, close: number }[] = stocks.map(d => ({
  date: new Date(d.date),
  close: +d.close
}))

type Datum = {
  date: Date
  close: number
}

export const AreaChart = () => {
  const margin                = {left: 50, right: 10, top: 30, bottom: 30},
        {w, h, width, height} = useSvgSize(800, 560, margin)

  const x      = scaleTime().domain(extent(data, d => d.date) as Date[]).range([0, width]),
        y      = scaleLinear().domain([0, max(data, d => d.close)] as number[]).range([height, 0]).nice(),
        areaFn = area<Datum>().x(d => x(d.date)).y0(y(0)).y1(d => y(d.close))

  return <div className={"relative m-10"}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisLeft scale={y}/>
        <AxisBottom top={height} scale={x}/>
        <path d={areaFn(data as unknown as Datum[])!} className={"fill-indigo-300 stroke-cyan-300 opacity-75"}/>
      </g>
    </svg>

    <div className={"absolute"}>

    </div>
  </div>
}
