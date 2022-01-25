import {ChromChart} from "@/charts/ChromChart"
import data from "@/json/gene.json"
import {GeneArrow} from "@/widgets"
import {scaleOrdinal, sum} from "d3"
import {motion} from "framer-motion"
import React from "react"

type Exon = {
  start: number
  end: number
}

type Gene = {
  name: string
  id: string
  chrom: string
  breakpoint1: number
  breakpoint2: number
  exons: Exon[]
}

const colors = [
  "#f163b7",
  "#fdd874",
  "#dc04ff",
  "#9a63fa",
  "#ef9bba",
  "#9defbd",
  "#04a6ff",
  "#2ec0b1"
]

type GenomePartProps = {
  width?: number
  height?: number
  gene: Gene
  left?: number
  top?: number
  fill?: string
}

type ExonIntronsProps = {
  exons: Exon[]
  max?: number
  left?: number
  top?: number
}

type LinkDashProps = {
  x1: number
  x2: number
  h1?: number
  h2?: number
  stroke?: string
}

export const GenomePart = ({width = 600, height = 130, gene, left = 0, top = 0, fill = "#f57990"}: GenomePartProps) => {
  const {exons, breakpoint1, breakpoint2, name, id} = gene
  const w1 = 2.5, w2 = 2.5, w = w1 + w2, h = 12

  const exonLength  = sum(exons, d => d.end - d.start),
        intronCount = exons.length - 1,
        exonWidth   = width - w * intronCount

  const scale = (d: number) => d / exonLength * exonWidth
  const accessRange = (e: Exon) => e.end - e.start

  const prevTotal = (index: number, exons: Exon[]) => sum(exons.filter((_, i1) => i1 < index), accessRange)

  const i1                = exons.findIndex(d => d.start === breakpoint1),
        i2                = exons.findIndex(d => d.end === breakpoint2),
        fusions           = exons.slice(i1, i2 + 1),
        fusionIntronCount = fusions.length - 1,
        fusionTotalWidth  = scale(sum(fusions, accessRange)) + w * fusionIntronCount,
        offset            = left > 0 ? -50 : width - fusionTotalWidth + 50

  const x = (exon: Exon, i: number, exons: Exon[]) => [scale(prevTotal(i, exons)) + w * i, scale(exon.end - exon.start)]

  const color = scaleOrdinal<string>().range(colors)

  const ExonIntrons = ({exons, max = exons.length - 1, left = 0, top = 0}: ExonIntronsProps) =>
    <g transform={`translate(${left},${top})`}>
      {exons.map((e, i) => {
          const [x0, w]  = x(e, i, exons),
                arrowX0  = x0 + w,
                fontSize = Math.min(Math.max(7, w * 0.5), h * 4 / 3)
          return <React.Fragment key={`${e.start}-${e.end}`}>
            <motion.rect
              // animate={{x: [0, x0], width: [0, w]}}
              x={x0}
              y={0}
              width={w}
              height={h * 2}
              fill={color(`${i}`)}
            />

            {w >= 7 &&
              <text
                x={x0 + w / 2}
                y={h}
                fontSize={fontSize}
                textAnchor={"middle"}
                alignmentBaseline={"middle"}
                fill={"#fff"}>
                {i + 1}
              </text>}

            {i < max && <GeneArrow x={arrowX0} h={h} fill={color(`${i}`)}/>}

          </React.Fragment>
        }
      )}
    </g>

  const LinkDash = ({x1, x2, h1 = 26, h2 = 44, stroke = "#ea708d"}: LinkDashProps) =>
    <motion.polyline
      points={`${x1},${h * 2} ${x1},${h * 2 + h1} ${x2},${h * 2 + h1 + h2}`}
      fill={"none"}
      stroke={stroke}
      strokeWidth={1.2}
      strokeDasharray={"3 2"}
    />

  return <g transform={`translate(${left}, ${top})`}>
    <ExonIntrons exons={exons}/>
    <ExonIntrons exons={fusions} left={offset} top={94}/>

    <text x={width / 2} y={h * 2 + 25} textAnchor={"middle"} fontSize={8}>{name}</text>
    <text x={width / 2} y={h * 2 + 35} textAnchor={"middle"} fontSize={8}>{id}</text>
    <LinkDash
      x1={scale(prevTotal(i1, exons)) + w * i1 + 0.5}
      x2={offset}
    />
    <LinkDash
      x1={left > 0
        ? scale(prevTotal(i2, fusions)) + w * i2 + 7
        : scale(prevTotal(i2, fusions)) + w * i2 - 6.5}
      x2={left > 0 ? fusionTotalWidth - 50 : width + 50}
    />

  </g>
}

export const FusionPlot = () => {

  return <div className={"relative mx-10 my-5"}>

    <svg width={600} height={150}>
      <ChromChart height={15}/>
      <ChromChart height={15} chrom={"chr2"} left={400}/>
      <GenomePart width={300} gene={data[0]} top={20}/>
      <GenomePart width={200} gene={data[1]} left={400} top={20} fill={"#50bcfc"}/>
    </svg>
  </div>
}
