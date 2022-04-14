import {useSvgSize}                from "@/hooks"
import {chordColors}               from "@/libs"
import {scaleLinear, scaleOrdinal} from "d3"
import {useEffect}                 from "react"
import coverage                    from "./gtex.coverage.json"
import ready                       from "./gtex.ready.json"

const uniqWith = (arr: any[], fn: any) => arr.filter((element, index) => arr.findIndex((step) => fn(element, step)) === index)


export const Coverage = () => {
  const margin                = {left: 40, right: 10, top: 60, bottom: 30},
        {w, h, width, height} = useSvgSize(690, 450, margin)

  let start = 43348843,
      end   = 43349002

  useEffect(() => {
    const step = 10

    const result: [number, number, number][] = []

    for (let i = start; i < end; i += step) {
      let count = coverage
        .filter(d => {
          let [s1, e1] = d
          return e1 > i && i + step >= s1
        }).length

      result.push([i, i + step, count])
    }

    // console.log(result)
    // console.log(coverage.length)
    //
    // console.log(coverage
    //   .map(d => [Math.min(d[0], d[1]), Math.max(d[0], d[1])]).filter(d => d[0]!=d[1]))

    // let i = 43814647
    // console.log(coverage.filter(d =>
    //   (d[1] > i && d[0] < end)
    //   || (d[1] < i && d[0] > end)
    //   || (d[0] > i && d[0] < end)
    //   || (d[1] > i && d[1] < end)).length)
  }, [])

  const x    = scaleLinear()
          .domain([start, end])
          .range([0, width]),
        y    = scaleLinear()
          .domain([0, 50])
          .range([height, 0]),
        fill = scaleOrdinal<number, string>()
          .range(chordColors)
  return <div>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {ready.map((d, i) => <rect key={d[0]} x={x(d[0])} y={y(d[2])} width={x(d[1]) - x(d[0])}
                                   height={height - y(d[2])}
                                   fill={fill(i)}/>)}
      </g>
    </svg>
  </div>
}
