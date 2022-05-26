import {useAnnotation}                       from "@/hooks"
import {bpLength, hugeDiff}                  from "@/libs"
import {fusionState}                         from "@/store"
import {GeneArrow}                           from "@/widgets"
import {curveBumpY, line, scaleOrdinal, sum} from "d3"
import {motion}                              from "framer-motion"
import React                                 from "react"
import {useRecoilValue}                      from "recoil"
import useSWR                                from "swr"
import {AnnotationChart}                     from "./AnnotationChart"
import {ChromChart}                          from "./ChromChart"

const colors1 = [
  "#f39acf",
  "#dc04ff",
  "#9a63fa",
  "#f80e64"
]

const colors2 = [
  "#9defbd",
  "#79f592",
  "#2ec0b1",
  "#17b3f6"
]

type GenomePartProps = {
  width?: number
  height?: number
  left?: number
  top?: number
  name: string
  id?: string
  exons: Exon[]
  breakpoint: number
  strand: string
  colors: string[]
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

type BraceProps = {
  points: number[][]
}

export const FusionPart = ({
                             width = 600,
                             height = 130,
                             left = 0,
                             top = 0,
                             name,
                             id,
                             exons,
                             breakpoint,
                             strand,
                             colors
                           }: GenomePartProps) => {
  const w1 = 2.5, w2 = 2.5, w = w1 + w2, h = 16

  const exonLength  = sum(exons, d => d.end - d.start),
        intronCount = exons.length - 1,
        exonWidth   = width - w * intronCount

  const scale = (d: number) => d / exonLength * exonWidth
  const accessRange = (e: Exon) => e.end - e.start

  const prevTotal = (index: number, exons: Exon[]) => sum(exons.filter((_, i1) => i1 < index), accessRange)

  const bi                = exons.findIndex(d => d.start === breakpoint)
          || exons.findIndex(d => d.end === breakpoint),
        fusions           = strand === "+" ? exons.slice(bi, exons.length) : exons.slice(0, bi),
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
            <rect
              // animate={{x: [0, x0], width: [0, w]}}
              x={x0}
              y={0}
              width={w > 0 ? w : -w}
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

  const LinkDash = ({
                      x1,
                      x2,
                      h1 = 26,
                      h2 = 44,
                      stroke = "#ea708d"
                    }: LinkDashProps) =>
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

    <text x={width / 2} y={h * 2 + 25} textAnchor={"middle"} fontSize={8}
          className={"fill-gray-600 font-medium"}>{name}</text>
    <text x={width / 2} y={h * 2 + 35} textAnchor={"middle"} fontSize={8}
          className={"fill-gray-600 font-medium"}>{id}</text>
    {/*<LinkDash*/}
    {/*  x1={scale(prevTotal(bi, exons)) + w * i1 + 0.5}*/}
    {/*  x2={offset}*/}
    {/*/>*/}
    {/*<LinkDash*/}
    {/*  x1={left > 0*/}
    {/*    ? scale(prevTotal(bi, fusions)) + w * i2 + 7 + 25*/}
    {/*    : scale(prevTotal(i2, fusions)) + w * i2 - 6.5 + 25}*/}
    {/*  x2={left > 0 ? fusionTotalWidth - 50 : width + 50}*/}
    {/*/>*/}
  </g>
}

export const FusionChart = () => {
  const {
          chrom1,
          chrom2,
          gene1,
          gene2,
          breakpoint1,
          breakpoint2,
          strand1,
          strand2
        } = useRecoilValue(fusionState)
  const {data: exons1} = useSWR(`/exons/${gene1}`)
  const {data: exons2} = useSWR(`/exons/${gene2}`)
  const {data: transcript1} = useSWR<Transcript[]>(`/transcripts/${gene1}`)
  const {data: transcript2} = useSWR<Transcript[]>(`/transcripts/${gene2}`)
  const {data: cnvs1} = useAnnotation<Cnv[]>("cnv", exons1)
  const {data: snvs1} = useAnnotation<Snv[]>("snv", exons1)
  const {data: m6as1} = useAnnotation<M6a[]>("m6a", exons1)
  const {data: ecDnas1} = useAnnotation<EcDna[]>("ecdna", exons1)
  const {data: cnvs2} = useAnnotation<Cnv[]>("cnv", exons2)
  const {data: snvs2} = useAnnotation<Snv[]>("snv", exons2)
  const {data: m6as2} = useAnnotation<M6a[]>("m6a", exons2)
  const {data: ecDnas2} = useAnnotation<EcDna[]>("ecdna", exons2)

  const w = 1250
  const l1 = bpLength(chrom1)
  const l2 = bpLength(chrom2)
  const w1 = l1 / (l1 + l2) * w * 0.85
  const w2 = l2 / (l1 + l2) * w * 0.85

  const g_l1 = 90917724 - 90709816
  const g_l2 = 15670 - 11869
  const {huge, former, ratio} = hugeDiff(g_l1, g_l2)
  const rate = huge
    ? former
      ? 0.65
      : 0.35
    : ratio

  const g_w1 = rate * w * 0.92
  const g_w2 = (1 - rate) * w * 0.92

  const lineFn = line<number[]>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(curveBumpY)

  const points1 = [[105, 20], [0, 70]]
  const points2 = [[105, 20], [300, 70]]

  const points3 = [[555, 20], [400, 70]]
  const points4 = [[555, 20], [600, 70]]

  const Brace = ({points}: BraceProps) =>
    <motion.path
      // animate={{strokeDasharray: ["0,500", "500,0"]}}
      transition={{duration: 2.5}}
      d={lineFn(points)!}
      className={"stroke-code-punctuation fill-transparent"}
    />

  return <div className={"relative mx-10 my-5"}>

    <svg width={w} height={200}>
      <ChromChart width={w1} height={25} chrom={chrom1} left={1} top={1}/>
      <ChromChart width={w2} height={25} chrom={chrom2} left={w1 + w * 0.15 - 1} top={1}/>

      <Brace points={points1}/>
      <Brace points={points2}/>
      <Brace points={points3}/>
      <Brace points={points4}/>

      <g transform={`translate(0, 70)`}>
        {exons1 &&
          <FusionPart
            width={g_w1}
            name={gene1}
            exons={exons1}
            breakpoint={breakpoint1}
            strand={strand1}
            colors={colors1}
          />}
        {exons2 &&
          <FusionPart
            width={g_w2}
            left={g_w1 + w * 0.08 - 1}
            name={gene2}
            exons={exons2}
            breakpoint={breakpoint2}
            strand={strand2}
            colors={colors2}
          />}
      </g>
    </svg>
    <div className={`flex justify-between w-[1250px]`}>
      {exons1 && transcript1 && cnvs1 && snvs1 && m6as1 && ecDnas1 &&
        <AnnotationChart
          width={g_w1}
          exons={exons1}
          transcripts={transcript1}
          cnvs={cnvs1}
          snvs={snvs1}
          m6as={m6as1}
          ecDnas={ecDnas1}
        />}
      {exons2 && transcript2 && cnvs2 && snvs2 && m6as2 && ecDnas2 &&
        <AnnotationChart
          width={g_w2}
          exons={exons2}
          transcripts={transcript2}
          cnvs={cnvs2}
          snvs={snvs2}
          m6as={m6as2}
          ecDnas={ecDnas2}
        />}
    </div>
  </div>
}
