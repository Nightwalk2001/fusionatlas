import {Chord, Ribbon}  from "@visx/chord"
import {LinearGradient} from "@visx/gradient"
import {Group}          from "@visx/group"
import {scaleOrdinal}   from "@visx/scale"
import {Arc}            from "@visx/shape"
import {Zoom}           from "@visx/zoom"
import React            from "react"
import dataMatrix       from "./json/matrix.json"

const pink = "#ff2fab"
const orange = "#ffc62e"
const purple = "#dc04ff"
const purple2 = "#7324ff"
const red = "#d04376"
const green = "#52f091"
const blue = "#04a6ff"
const lime = "#00ddc6"
const bg = "#feffff"

const descending = (a: number, b: number) => {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
}

const color = scaleOrdinal<number, string>({
  domain: [0, 1, 2, 3],
  range: ["url(#gpinkorange)", "url(#gpurplered)", "url(#gpurplegreen)", "url(#gbluelime)"]
})

type ChordProps = {
  width: number
  height: number
  centerSize?: number
}

export const ChordPlot = ({width, height, centerSize = 22}: ChordProps) => {
  height -= 77
  const outerRadius = Math.min(width, height) * 0.5 - (centerSize + 10)
  const innerRadius = outerRadius - centerSize

  return <div>
    <Zoom<SVGSVGElement> width={width} height={height}>
      {zoom => <svg
        width={width}
        height={height}
        style={{cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none"}}
        ref={zoom.containerRef}>
        <LinearGradient id="gpinkorange" from={pink} to={orange} vertical={false}/>
        <LinearGradient id="gpurplered" from={purple} to={red} vertical={false}/>
        <LinearGradient id="gpurplegreen" from={purple2} to={green} vertical={false}/>
        <LinearGradient id="gbluelime" from={blue} to={lime} vertical={false}/>
        <rect width={width} height={height} fill={bg} rx={14}/>
        <Group top={height / 2} left={width / 2}>
          <Chord matrix={dataMatrix} padAngle={0.05} sortSubgroups={descending}>
            {({chords}) => (
              <g>
                {chords.groups.map((group, i) => (
                  <Arc
                    key={`key-${i}`}
                    data={group}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    fill={color(i)}
                    onClick={() => {
                      alert(`${JSON.stringify(group)}`)
                    }}
                  />
                ))}
                {chords.map((chord, i) => {
                  return (
                    <Ribbon
                      key={`ribbon-${i}`}
                      chord={chord}
                      radius={innerRadius}
                      fill={color(chord.target.index)}
                      fillOpacity={0.75}
                      onClick={() => {
                        alert(`${JSON.stringify(chord)}`)
                      }}
                    />
                  )
                })}
              </g>
            )}
          </Chord>
        </Group>
      </svg>
      }
    </Zoom>
  </div>
}
