import React, {memo, SVGProps} from "react"
import Bands                   from "./json/band.json"

type Band = {
  chr: string
  start: number
  end: number
  id: string
  color: string
}

const bands = Bands as Band[]

type ChromosomeProps = {
  width?: number
  height?: number
  chromosomeId?: string
} & SVGProps<SVGSVGElement>

type BandGroupProps = {
  clipPath: string
  bands: Band[]
}

type BorderPathProps = {
  x?: number
  width: number
}

const colors = {
  gpos100: "rgb(0,0,0)",
  gpos: "rgb(0,0,0)",
  gpos75: "rgb(130,130,130)",
  gpos66: "rgb(160,160,160)",
  gpos50: "rgb(200,200,200)",
  gpos33: "rgb(210,210,210)",
  gpos25: "rgb(200,200,200)",
  gvar: "rgb(220,220,220)",
  gneg: "rgb(255,255,255)",
  acen: "rgb(217,47,39)",
  stalk: "rgb(100,127,164)"
}

export const Chromosome: React.FC<ChromosomeProps> =
  memo(({
          width = 150,
          height = 9,
          chromosomeId = "chr1",
          ...props
        }) => {
    const chromosome = bands.filter(b => b.chr === chromosomeId)
    const separate = chromosome.findIndex(b => b.color === "acen") + 1
    const q = chromosome.slice(0, separate)
    const p = chromosome.slice(separate)
    const mid = q[q.length - 1].end
    const end = p[p.length - 1].end
    const scale = end / width

    const BandGroup: React.FC<BandGroupProps> = ({clipPath, bands, ...props}) =>
      <g clipPath={clipPath} {...props}>
        {bands.map(b => <rect
          key={b.id}
          x={b.start / scale} y={0}
          width={(b.end - b.start) / scale}
          height={height}
          fill={colors[b.color]}
        />)}
      </g>

    const BorderPath: React.FC<BorderPathProps> = ({x = 0, width}) => <rect
      x={x} y={0}
      width={width}
      height={height}
      rx={height / 2}
      fill={"transparent"}
      stroke={"#000"}
      strokeWidth={0.1}
    />

    return <div className={"chromosome"}>
      <svg width={width + 2} height={height + 1} viewBox={`0, 0, ${width}, ${height}`} {...props}>
        <clipPath id={`q${chromosomeId}`}>
          <BorderPath width={mid / scale}/>
        </clipPath>
        <clipPath id={`p${chromosomeId}`}>
          <BorderPath x={mid / scale} width={(end - mid) / scale}/>
        </clipPath>

        <BorderPath width={mid / scale}/>
        <BorderPath x={mid / scale} width={(end - mid) / scale}/>

        <BandGroup clipPath={`url(#q${chromosomeId})`} bands={q}/>
        <BandGroup clipPath={`url(#p${chromosomeId})`} bands={p}/>
      </svg>

      <style jsx>{`
        .chromosome rect:hover {
          fill: #6a5fbb;
        }
      `}</style>
    </div>
  })
