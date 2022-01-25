import {scaleLinear, scaleOrdinal} from "d3"
import React, {memo, SVGProps} from "react"
import Bands from "../json/bands.json"

type Band = {
  id: string
  start: number
  end: number
  color: string
}

type Chroms = {
  chrom: string
  bands: Band[]
}

const chroms = Bands as Chroms[]

type ChromosomeProps = {
  width?: number
  height?: number
  left?: number
  top?: number
  chrom?: string
} & Omit<SVGProps<SVGGElement>, "transform">

type BandGroupProps = {
  clipPath: string
  bands: Band[]
}

type BorderPathProps = {
  x?: number
  width: number
}

export const ChromChart = memo(({
                                  width = 150,
                                  height = 9,
                                  left = 0,
                                  top = 0,
                                  chrom = "chr1",
                                  ...props
                                }: ChromosomeProps) => {
  const chromosome = chroms.find(c => c.chrom === chrom)!,
        bands      = chromosome.bands,
        separate   = bands.findIndex(b => b.color === "acen") + 1,
        q          = bands.slice(0, separate),
        p          = bands.slice(separate),
        mid        = q[q.length - 1].end,
        end        = p[p.length - 1].end

  const x = scaleLinear()
    .domain([0, end])
    .range([0, width])

  const color = scaleOrdinal<string>()
    .domain([
      "gpos100", "gpos", "gpos75", "gpos66",
      "gpos50", "gpos33", "gpos25", "gvar",
      "gneg", "acen", "stalk"
    ])
    .range([
      "rgb(0,0,0)", "rgb(0,0,0)", "rgb(130,130,130)", "rgb(160,160,160)",
      "rgb(200,200,200)", "rgb(210,210,210)", "rgb(200,200,200)", "rgb(220,220,220)",
      "rgb(255,255,255)", "rgb(217,47,39)", "rgb(100,127,164)"
    ])

  const BandGroup = ({clipPath, bands, ...props}: BandGroupProps) =>
    <g clipPath={clipPath} {...props}>
      {bands.map(b => <rect
        key={b.id}
        x={x(b.start)} y={0}
        width={x(b.end) - x(b.start)}
        height={height}
        fill={color(b.color)}
      />)}
    </g>

  const BorderPath = ({x = 0, width}: BorderPathProps) =>
    <rect
      x={x} y={0}
      width={width}
      height={height}
      rx={height / 2}
      fill={"transparent"}
      stroke={"#000"}
      strokeWidth={0.1}
    />

  return <g transform={`translate(${left}, ${top})`} {...props}>
    <clipPath id={`q${chrom}`}>
      <BorderPath width={x(mid)}/>
    </clipPath>
    <clipPath id={`p${chrom}`}>
      <BorderPath x={x(mid)} width={x(end) - x(mid)}/>
    </clipPath>

    <BorderPath width={x(mid)}/>
    <BorderPath x={x(mid)} width={x(end) - x(mid)}/>

    <BandGroup clipPath={`url(#q${chrom})`} bands={q}/>
    <BandGroup clipPath={`url(#p${chrom})`} bands={p}/>
  </g>
})
