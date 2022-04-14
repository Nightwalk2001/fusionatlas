import {useSvgSize}                                        from "@/hooks"
import {minMax}                                            from "@/libs"
import {scaleLinear, scaleOrdinal, scaleSqrt, select, sum} from "d3"
import {Fragment, useEffect, useRef, useState}             from "react"
import raw                                                 from "../json/all.json"

type MultiFusion = {
  position: number
  count: number
  name: string
}

type FusionAllChartProps = {
  data?: MultiFusion[]
}

const ready = raw.sort((a, b) => a.position - b.position)

const colors = [
  "#929afc",
  "#f48876",
  "#4ddbb6",
  "#c492fc",
  "#ffbd8c",
  "#5ee0f7",
  "#ffb6ff",
  "#929afc",
  "#f48876"
]

export const FusionAllChart = ({data = ready}: FusionAllChartProps) => {
  const margin        = {left: 70, right: 90, top: 20, bottom: 30},
        {w, h, width} = useSvgSize(900, 510, margin)

  const ref = useRef<SVGGElement>(null)

  const [arr, setArr] = useState<number[]>([])

  const circleY = 30

  // useEffect(() => {
  //   const res = []
  //
  //   for (let i = 0; i < 13; i++)
  //     res.push({
  //       position: randomInt(300, 800)(),
  //       type: randomInt(0, 3)() > 2 ? "rna" : "gene",
  //       count: randomInt(1, 10)(),
  //       name: `Rand-${i}`
  //     })
  //
  //   console.log(res)
  // }, [])

  const x     = scaleLinear()
          .domain([270, 950])
          .range([0, width]),
        r     = scaleSqrt()
          .domain(minMax(data, "count"))
          .range([4, 17]),
        color = scaleOrdinal<string>()
          .range(colors)

  useEffect(() => {
    const lengthArr: number[] = []

    const texts = select(ref.current)
      .selectAll<SVGTextElement, unknown>("g .name")

    texts.each(function () {
      lengthArr.push(this?.getComputedTextLength())
    })

    setArr(lengthArr)
  }, [])

  return <div>
    <svg width={w} height={h} className={"select-none"}>
      <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
        {data?.map((d, i) => {
          const {position, count, name} = d

          const radius = r(count)
          const x1 = x(position) + i * 1.5
          const x0 = x(data[0].position) - 20
          const x2 =
                  x0 + sum(arr.slice(0, i))
                  + sum(data?.slice(0, i + 1).map(d => r(d.count) * 2))
                  - radius - r(data[0].count) + 4 * i

          return <Fragment key={d.name}>
            <path
              d={`M${x1},200 L${x1},140 L${x2},50 L${x2},30`}
              fill={"none"}
              stroke={"#42e3ca"}
            />
            <circle cx={x2} cy={circleY - radius} r={radius} fill={color(`${i}`)}/>
            {count > 1
              && <text
                x={x2}
                y={circleY - radius}
                fill={"#fff"}
                textAnchor={"middle"}
                fontSize={radius * 1.5}
              >
                {count}
              </text>}
            <text
              x={x2 + radius + 2}
              y={circleY - radius}
              fill={"#fd7f8c"}
              fontSize={Math.min(radius * 2, 13)}
              className={"name"}
            >
              {name}
            </text>
          </Fragment>
        })}

        <g transform={`translate(0, 200)`}>
          {/*<rect x={0} y={0} width={width} height={30} fill={"#f0f2f3"}/>*/}
          <path d={`M0,0 L${width},0 L${width},30 L0,30`} fill={"none"} stroke={"#4e5052"} strokeWidth={0.5}/>
          <rect x={100} y={0.5} width={200} height={29} fill={"#ef4286"}/>
          <rect x={400} y={0.5} width={300} height={29} fill={"#75edfd"}/>
        </g>
      </g>
    </svg>
  </div>
}
