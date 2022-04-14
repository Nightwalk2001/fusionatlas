import {hideTooltip, minMax, showTooltip}                                                      from "@/libs"
import {ChartTooltip}                                                                          from "@/widgets"
import {D3ZoomEvent, interpolateRgb, scaleLinear, scaleOrdinal, scaleSequential, select, zoom} from "d3"
import {motion}                                                                                from "framer-motion"
import React, {MouseEvent, useEffect, useRef}                                                  from "react"

type IsoformChartProps = {
  width: number
  left?: number
  exons: Exon[]
  transcripts: Transcript[]
  cnvs: Cnv[]
  snvs: Snv[]
  ecDnas: EcDna[]
  m6as: M6a[]
}

export const AnnotationChart = ({
                                  width,
                                  left = 0,
                                  exons,
                                  transcripts,
                                  cnvs,
                                  snvs,
                                  ecDnas,
                                  m6as
                                }: IsoformChartProps) => {
  const ref = useRef<SVGSVGElement>(null)
  const transformRef = useRef<SVGGElement>(null)

  const x         = scaleLinear()
          .domain(minMax(exons, "end"))
          .range([0, width]),
        color     = scaleSequential()
          .domain([0, 1])
          .interpolator(interpolateRgb("#d4d4fc", "#de1444")),
        typeColor = scaleOrdinal<string>()
          .domain(["Cancer cell line", "Cancer tissue", "Healthy person"])
          .range(["#d54318", "#5d5dfa", "#31e3fa"])

  const root = select(ref.current!)
  const container = select(transformRef.current!)
  const tooltip = select<HTMLDivElement, any>("#iso")

  const handleMoveCnv = (event: MouseEvent) => {
    root.selectAll("rect").attr("opacity", 0.1)
    select(event.currentTarget).attr("opacity", 1)
  }

  const handleLeaveCnv = () => {
    root.selectAll("rect").attr("opacity", 1)
    hideTooltip(tooltip)
  }

  const handleClickCnv = (event: React.MouseEvent, d: Cnv) => showTooltip(event, tooltip, d)

  useEffect(() => {
    const zoomed = ({transform}: D3ZoomEvent<SVGSVGElement, unknown>) =>
      // const zx = transform.rescaleX(x).interpolate(interpolateRound)
      // const zy = transform.rescaleY(y).interpolate(interpolateRound)
      container.attr("transform", `scale(${transform.k}, 1)`)

    const onZoom = zoom<SVGSVGElement, unknown>()
      .on("zoom", zoomed)

    root.call(onZoom)
  }, [])

  return <>
    <svg ref={ref} width={width} height={500} className={"overscroll-y-none"}>
      <pattern id="p" viewBox={"0,0,18,12"} width={`${18 / width}`} height={"100%"}>
        <polygon
          points={"0,3.6 12,3.6 10,0 18,6 10,12 12,7.2 0,7.2"}
          fill={"#ea1977"}
          className={"opacity-50"}
        />
      </pattern>

      <g ref={transformRef} transform={`translate(${left}, 10)`}>
        <g>
          {cnvs?.map(d =>
            <motion.rect
              key={`${d.start}-${d.end}`}
              x={x(d.start)}
              y={20}
              width={x(d.end) - x(d.start)}
              height={20}
              fill={color(d.value)}
              className={"stroke-transparent cursor-pointer"}
              onMouseMove={handleMoveCnv}
              onMouseLeave={handleLeaveCnv}
              onClick={event => handleClickCnv(event, d)}
            />)}
        </g>
        <g>
          {snvs?.map(d =>
            <circle
              key={d.position}
              cx={x(d.position)}
              cy={75}
              r={2}
              className={`stroke-sky-300 
              fill-transparent cursor-pointer`}
            />)}
        </g>
        <g>
          {ecDnas?.map(d =>
            <rect
              key={d.eccId}
              x={x(d.start)}
              y={115}
              width={x(d.end) - x(d.start)}
              height={20}
              fill={typeColor(d.type)}
            />)}
        </g>
        <g>
          {m6as?.map(d =>
            <rect
              key={d.sample}
              x={x(d.start)}
              y={165}
              width={x(d.end) - x(d.start)}
              height={20}
              fill={color(d.foldEnrichment)}
            />)}
        </g>

        <g>
          {transcripts?.map((d, i) => {
            const t1 = exons.findIndex(e => e.start === d.start)
            const t2 = exons.findIndex(e => e.end === d.end)
            const tmp = exons.slice(t1, t2 + 1)

            return <g key={i}>
              <clipPath id={`${d.start}-${d.end}`}>
                <rect
                  x={x(tmp[0]?.start)}
                  y={195 + i * 14 + 4}
                  width={x(tmp?.[tmp.length - 1]?.end) - x(tmp[0]?.start)}
                  height={4}
                />
              </clipPath>
              <rect
                x={0}
                y={195 + i * 14 + 4}
                width={width}
                height={4}
                fill={"url(#p)"}
                clipPath={`url(#${d.start}-${d.end})`}
              />
              {tmp.map((e, i) =>
                <rect
                  key={i}
                  x={x(e.start)}
                  y={195 + i * 14}
                  width={x(e.end) - x(e.start)}
                  height={12}
                  fill={"#6c68fa"}
                />)}
            </g>
          })}
        </g>
      </g>
    </svg>
    <div id={"iso"} className={"tooltip tooltip-kv"}>
      <ChartTooltip/>
    </div>
  </>
}
