import {scaleBand}                                 from "@visx/scale"
import {axisBottom, axisLeft, scaleLinear, select} from "d3"
import React, {useEffect}                          from "react"
import Data                                        from "./json/barchart.json"

type Country = {
  country: string
  value: number
}

const countries = Data as Country[]

export const BarChart = () => {
  useEffect(() => {
    const margin = {top: 10, right: 30, bottom: 90, left: 40},
          width  = 460 - margin.left - margin.right,
          height = 450 - margin.top - margin.bottom

    const svg = select("#bar")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = scaleBand()
      .range([0, width])
      .domain(countries.map(d => d.country as string))
      .padding(0.2)

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      // @ts-ignore
      .call(axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")

    const y = scaleLinear()
      .domain([0, 13000])
      .range([height, 0])

    svg.append("g")
      .call(axisLeft(y))

    svg.selectAll("mb")
      .data(countries)
      .join("rect")
      .attr("x", d => x(d.country))
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      .attr("height", _ => height - y(0))
      .attr("y", _ => y(0))

    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d: Country) => y(d.value))
      .attr("height", (d: Country) => height - y(d.value))
      .delay((d, i) => i * 100)
  })

  return <div id={"bar"}/>
}