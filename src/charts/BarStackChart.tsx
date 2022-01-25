import {AxisBottom} from "@visx/axis"
import {Grid} from "@visx/grid"
import {scaleBand, scaleLinear, scaleOrdinal, stack} from "d3"
import {motion} from "framer-motion"
import {useInView} from "react-intersection-observer"


type Data = {
  group: string
  nitrogen: number
  normal: number
  stress: number
}

const data: Data[] = [
  {
    group: "banana",
    nitrogen: 12,
    normal: 1,
    stress: 13
  },
  {
    group: "poacher",
    nitrogen: 6,
    normal: 6,
    stress: 33
  },
  {
    group: "sorghum",
    nitrogen: 11,
    normal: 28,
    stress: 12
  },
  {
    group: "tritium",
    nitrogen: 19,
    normal: 6,
    stress: 1
  }
]

export const BarStackChart = () => {
  const {ref, inView} = useInView({triggerOnce: true})

  const w      = 460,
        h      = 400,
        margin = {top: 10, right: 30, bottom: 40, left: 50},
        width  = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom

  const subgroups = ["normal", "nitrogen", "stress"]

  const x = scaleBand()
    .domain(data.map(i => i.group))
    .range([0, width])
    .padding(0.2)

  const y = scaleLinear()
    .domain([0, 60])
    .range([height, 0])

  const color = scaleOrdinal<string>()
    .domain(subgroups)
    .range(["#f54ba0", "#3eeed3", "#d0acfc"])

  const stackedData = stack<Data>().keys(subgroups)(data)

  return <div ref={ref}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Grid width={width} height={height} xScale={x} yScale={y}/>
        {/*<AxisLeft*/}
        {/*  scale={y}*/}
        {/*  stroke={"#7d8081"}*/}
        {/*  hideTicks={true}*/}
        {/*  hideAxisLine={true}*/}
        {/*  hideZero={true}*/}
        {/*  tickLabelProps={() => ({*/}
        {/*    fontSize: 10,*/}
        {/*    fontWeight: 500,*/}
        {/*    fill: "#575959",*/}
        {/*    textAnchor:"middle",*/}
        {/*    transform: `translate(-5,3)`*/}
        {/*  })}*/}
        {/*/>*/}
        <AxisBottom
          scale={x}
          top={height}
          stroke={"#7d8081"}
          hideTicks={true}
          hideAxisLine={true}
          tickLabelProps={() => ({
            fontSize: 12,
            fontWeight: 500,
            fill: "#575959",
            textAnchor: "middle",
            transform: `translate(-5,3)`
          })}
        />
        {inView && stackedData.map(d0 =>
          <g key={d0.key}>
            {d0.map((d, i) =>
              <motion.rect
                key={i}
                animate={{
                  y: [height, y(d[1])],
                  height: [0, y(d[0]) - y(d[1])],
                  transition: {duration: 2.5}
                }}
                x={x(d.data.group as unknown as string)}
                width={x.bandwidth()}
                fill={color(d0.key)}
                fillOpacity={0.8}
                className={"cursor-pointer"}
              />)}
          </g>
        )}
      </g>
    </svg>
  </div>
}
