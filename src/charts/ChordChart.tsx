// noinspection JSVoidFunctionReturnValueUsed

import {arc, chord, ChordGroup, descending, ribbonArrow, transition} from "d3"
import {motion} from "framer-motion"
import {useEffect, useState} from "react"
import {useInView} from "react-intersection-observer"

const matrix = [
  [0, 5871, 8916, 2868, 3467],
  [1951, 0, 2060, 6171, 3345],
  [8010, 16145, 0, 8045, 345],
  [1013, 990, 940, 0, 1273],
  [700, 900, 440, 50, 6123]
]

const colors = [
  "#4aeaa1",
  "#6079f5",
  "#34d9f3",
  "#f56486",
  "#ef02d0"
]

export const ChordChart = () => {
  const {ref, inView} = useInView({triggerOnce: true})
  const [value, setValue] = useState<number>(0)

  const width  = 500,
        height = 500

  const chords = chord()
    .padAngle(0.05)
    .sortSubgroups(descending)
    (matrix)

  const arcFn = arc<ChordGroup>()
    .startAngle(d => d.startAngle * value)
    .endAngle(d => d.endAngle * value)
    .innerRadius(202)
    .outerRadius(220)

  const ribbonFn = ribbonArrow()
    .radius(200)
    .source(d => d.source)
    .target(d => d.target)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)

  useEffect(() => {
    const trans = transition().duration(4000)

    trans.tween("height", () => (t: number) => setValue(t))
  }, [inView])

  return <div ref={ref}>
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {chords.groups.map((d, i) =>
          <motion.path
            key={`${d.startAngle}-${d.endAngle}`}
            animate={{transition: {duration: 1, delay: i}}}
            d={arcFn(d)!}
            fill={colors[i]}
          />)}

        <g>
          {chords.map(d =>
            <motion.path
              key={`${d.source.value}-${d.target.value}`}
              d={ribbonFn(d as any)!}
              fill={colors[d.source.index]}
              opacity={0.1}
              whileHover={{opacity: 0.85}}
            />)}
        </g>
      </g>
    </svg>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true}}
      transition={{duration: 3}}
      variants={{
        visible: {opacity: 1, scale: 1},
        hidden: {opacity: 0, scale: 0}
      }}
    >
      children
    </motion.div>
  </div>
}
