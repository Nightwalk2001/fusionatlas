import React from "react"
import Genes from "./json/gene.json"

type Exon = {
  start: number
  end: number
}

type Gene = {
  gene: string
  geneId: string
  chr: string
  breakpoint1: number
  breakpoint2: number
  exons: Exon[]
}

type GenomeProps = {
  width?: number
  height?: number
}
const gene = Genes[0] as Gene
const exons = gene.exons.sort(i => i.start) as Exon[]

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

export const Genome: React.FC<GenomeProps> = ({width = 400, height = 150}) => {
  const total = exons.reduce((total, value) => total + value.end - value.start, 0)
  const w1 = 4
  const w2 = 4
  const h1 = 12
  const h2 = 3
  const h3 = 5
  const scale = (width - (exons.length - 1) * (w1 + w2)) / total
  const offset = 30
  const breakpoint1 = exons.findIndex(i => i.start === gene.breakpoint1)
  const breakpoint2 = exons.findIndex(i => i.end === gene.breakpoint2)
  const fusions = exons.slice(breakpoint1, breakpoint2 + 1)

  const x = (index: number) => {
    return exons.reduce((total, value, currentIndex) => {
      if (currentIndex < index) total += (value.end - value.start)
      return total
    }, 0)
  }

  return <svg width={width} height={height}>
    <pattern>
      <path/>
    </pattern>
    {
      exons.map((e, index) => {
        const x0 = x(index) * scale + (w1 + w2) * index
        const w = (e.end - e.start) * scale
        return <React.Fragment key={e.start}>
          <rect
            x={x0}
            y={0}
            width={w}
            height={h1 * 2}
            fill={colors[index % colors.length]}
          />

          {w >= 7 && <text x={x0 + w / 2 - 3.5} y={h1 + 3.5} fontSize={7} fill={"#fff"}>{index + 1}</text>}

          {index !== exons.length - 1
            &&
            <path
              d={`
              M ${x0 + w}, ${h1 - h2}
              L ${x0 + w + w1}, ${h1 - h2}
              L ${x0 + w + w1}, ${h1 - h3}
              L ${x0 + w + w1 + w2}, ${h1},
              L ${x0 + w + w1}, ${h1 + h3},
              L ${x0 + w + w1}, ${h1 + h2},
              L ${x0 + w}, ${h1 + h2}
              L ${x0 + w}, ${h1 - h2}
              Z
              `}
              fill={colors[index % colors.length]}
            />}
        </React.Fragment>
      })
    }
    {
      fusions.map((e, index) => {
        const x0 = x(index) * scale + (w1 + w2) * index + offset
        const w = (e.end - e.start) * scale
        const h = h1 * 2 + 70
        return <React.Fragment key={e.start}>
          <rect
            x={x0}
            y={h}
            width={w}
            height={h1 * 2}
            fill={colors[index % colors.length]}
          />

          {w >= 7 && <text x={x0 + w / 2 - 3.5} y={h + h1 + 3.5} fontSize={7} fill={"#fff"}>{index + 1}</text>}

          {index !== fusions.length - 1
            &&
            <path
              d={`
              M ${x0 + w}, ${h + h1 - h2}
              L ${x0 + w + w1}, ${h + h1 - h2}
              L ${x0 + w + w1}, ${h + h1 - h3}
              L ${x0 + w + w1 + w2}, ${h + h1}
              L ${x0 + w + w1}, ${h + h1 + h3}
              L ${x0 + w + w1}, ${h + h1 + h2}
              L ${x0 + w}, ${h + h1 + h2}
              L ${x0 + w}, ${h + h1 - h2}
              Z
              `}
              fill={colors[index % colors.length]}
            />}
        </React.Fragment>
      })
    }
    <polyline points={"0,24 0,50 256,94"} fill={"none"} stroke={"#626062"} strokeDasharray={"3 2"}/>
    <polyline points={"246,24 246,50 30,94"} fill={"none"} stroke={"#626062"} strokeDasharray={"3 2"}/>
  </svg>
}
