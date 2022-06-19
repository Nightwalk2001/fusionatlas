import {AxisBottom, AxisLeft} from "@visx/axis"
import {GridColumns, GridRows} from "@visx/grid"
import {scaleOrdinal} from "d3"
import {scaleBand} from "d3-scale"

export const WindChart = () => {
  const width  = 750,
        height = 500,
        margin = {left: 40, right: 20, top: 30, bottom: 40}

  const times      = [
          1, 2, 3, 4, 5, 6,
          7, 8, 9, 10, 11, 12,
          13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24
        ],
        directions = [
          "N", "NNW", "NW", "WNW",
          "W", "WSW", "SW", "SSW",
          "S", "SSE", "SE", "ESE",
          "E", "ENE", "NE", "NNE"
        ],
        colors     = [
          "#55efc4",
          "#81ecec",
          "#74b9ff",
          "#a29bfe",
          "#5352ed",
          "#00cec9",
          "#ff7675",
          "#ff7f50",
          "#e84393",
          "#ff4757",
          "#6c5ce7",
          "#ffeaa7",
          "#fdcb6e",
          "#fd79a8",
          "#eb3b5a",
          "#45aaf2",
          "#75f56f",
          "#E29578",
          "#83C5BE",
          "#C62CF2",
          "#67b7dc",
          "#70a1ff",
          "#7bed9f",
          "#6771dc",
          "#a367dc"
        ]

  const x     = scaleBand<number>()
          .domain(times)
          .range([0, width]),
        y     = scaleBand()
          .domain(directions.reverse())
          .range([height, 0]),
        color = scaleOrdinal<number, string>()
          .range(colors)

  return <svg
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
  >
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <AxisLeft
        scale={y}
        numTicks={16}
        hideTicks
        axisLineClassName={"stroke-gray-400"}
        tickLabelProps={() => ({
          fontSize: 12,
          fill: "#94a3b8",
          textAnchor: "end"
        })}/>
      <AxisBottom
        scale={x}
        top={height}
        numTicks={24}
        hideTicks
        axisLineClassName={"stroke-gray-400"}
        tickLabelProps={() => ({
          fontSize: 12,
          fill: "#94a3b8",
          textAnchor: "end"
        })}/>
      <GridRows scale={y} width={width} numTicks={16} lineStyle={{stroke: "#94a3b8"}}/>
      <GridColumns scale={x} height={height} numTicks={24} lineStyle={{stroke: "#94a3b8"}}/>

      {data.map((d, i) =>
        <circle
          key={i}
          cx={x(i + 1)! + x.bandwidth() / 2}
          cy={y(d)! + y.bandwidth() / 2}
          r={6}
          fill={color(i)}
        />)}
    </g>
  </svg>
}

const data = [
  "NNW", "N", "NNW", "N", "NNW", "NNW",
  "N", "NE", "E", "NE", "N", "WNW",
  "E", "SE", "N", "NNW", "N", "NE",
  "NNW", "N", "N", "NNW", "NNW", "N"
]
