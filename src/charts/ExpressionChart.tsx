import {useAnimateOnce, useSvgSize}                        from "@/hooks"
import {hideTooltip, minMax, showTooltip}                  from "@/libs"
import {ChartTooltip}                                      from "@/widgets"
import {AxisTop}                                           from "@visx/axis"
import {BaseType, scaleLinear, select}                     from "d3"
import React, {MouseEvent, useCallback, useEffect, useRef} from "react"
import raw                                                 from "../json/exp.json"

type RnaSeqSample = {
  sample: string
  fpkm: number
  type: string
  group: string
  cancer: string
  subtype: string
  subgroup: string
}

type ExpressionChartProps = {
  data?: RnaSeqSample[]
}

const exp = raw.sort(d => d.fpkm)
const color = "#ccd9f8"
const activeColor = "#ee132d"

export const ExpressionChart = ({data = exp}: ExpressionChartProps) => {
  const {ref, inView} = useAnimateOnce()
  const tooltipRef = useRef<HTMLDivElement>(null)

  const margin                = {left: 40, right: 20, top: 50, bottom: 20},
        {w, h, width, height} = useSvgSize(800, 390, margin)

  const x = useCallback(
          scaleLinear()
            .domain(minMax(data, "fpkm"))
            .range([0, width]), [width]),
        y = useCallback(
          scaleLinear()
            .domain([1, data.length])
            .range([0, height]), [height])

  const tooltip = select(tooltipRef.current!)

  const handleMouseMove = function (
    this: SVGCircleElement | BaseType,
    event: MouseEvent,
    d: RnaSeqSample) {
    select(this)
      .attr("r", 12)
      .style("stroke", activeColor)
      .style("stroke-width", 4)

    showTooltip(event, tooltip, d)
  }

  const handleMouseLeave = function (this: SVGCircleElement | BaseType) {
    select(this)
      .attr("r", 8.5)
      .style("stroke", color)
      .style("stroke-width", 0.9)

    hideTooltip(tooltip)
  }

  useEffect(() => {
    const circles = select("#circles")
      .selectAll(".circle")
      .data(data)
      .join("circle")
      .on("mouseover", handleMouseMove)
      .on("mouseleave", handleMouseLeave)
      .attr("cx", d => x(d.fpkm))
      .attr("cy", (_, i) => y(i + 1))
      .style("fill", "transparent")
      .style("stroke", color)
      .style("stroke-width", 0.9)
      .style("stroke-opacity", 0.55)
      .style("cursor", "pointer")

    if (inView) circles.transition()
      .duration(1)
      .delay((_, i) => i)
      .attr("r", 8.5)
  }, [data, inView])

  return <div ref={ref}>
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisTop
          scale={x}
          stroke={"#8a8a8a"}
          tickStroke={"#c7c9cb"}
          tickLength={6}
          tickLabelProps={() => ({
            dy: -4,
            fill: "#c7c9cb",
            fontSize: 12,
            fontFamily: "sans-serif",
            textAnchor: "middle"
          })}
          label={"JAK2 expression(RNA-seq FPKM of 928 tumors"}
          labelOffset={15}
          labelProps={{fontSize: 12, textAnchor: "middle", fill: "#606162"}}
        />

        <g id={"circles"} className={"translate-x-0 translate-y-0"}/>

        <g>
          {/*盒子*/}
          <rect/>
          {/*贯穿线*/}
          <path/>
          {/*最小线*/}
          <path/>
          {/*最大线*/}
          <path/>
        </g>
      </g>
    </svg>

    <div ref={tooltipRef} className={"tooltip tooltip-kv"}>
      <ChartTooltip/>
    </div>

  </div>
}
