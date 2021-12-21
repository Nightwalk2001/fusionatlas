import {hierarchy, scaleLinear, select, tree} from "d3"
import React, {useEffect}                     from "react"
import Data                                   from "./json/all.json"
import {Genome}                               from "./Genome"

type Domain = {
  name: string
  start: number
  end: number
}

type Mutation = {
  name: string
  position: number
}

type Fusion = {
  name: string
  position: number
  apex: "N" | "C"
}

type FusionAll = {
  domains: Domain[],
  mutations: Mutation[],
  fusions: Fusion[]
}

type Legend = {
  name: string
  color: string
}

const data = Data as FusionAll

const {domains, mutations, fusions} = data

export const FusionChart = () => {

  return <div>
    <Genome width={600} height={150}/>
  </div>
}

export const FusionAllChart = () => {

  const legends: Legend[] = domains.map((d, i) => ({
    name: d.name,
    color: i === 0 ? "#3eeed3" : "#ec77c7"
  }))

  mutations.push(...fusions.map(i => ({
    name: i.name,
    position: i.position
  })))

  mutations.sort((a, b) => a.position - b.position)

  const bubbles = {
    children: mutations
  }

  useEffect(() => {
    const margin = {top: 10, right: 40, bottom: 30, left: 30},
          width  = 450 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom

    const svg = select("#area")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const x = scaleLinear()
      .domain([500, 1200])
      .range([0, width])

    svg.append("polyline")
      .transition()
      .duration(2000)
      .attr("points", `0,0 370,0 370,40 0,40`)
      .attr("fill", " none")
      .attr("stroke", "#353636")
      .attr("stroke-width", 0.2)

    svg.selectAll(".domain")
      .data(domains)
      .join("rect")
      .attr("class", "domain")
      .attr("x", d => x(d.start))
      .attr("y", 0)
      .attr("height", 40)
      .transition()
      .duration(2000)
      .attr("width", d => x(d.end) - x(d.start))
      .attr("fill", (d, i) => i === 0 ? "#3eeed3" : "#ec77c7")
      .attr("mouseevent", "all")

    const legendGroup = svg.selectAll(".legend")
      .data(legends)
      .join("g")
      .attr("class", "legend")
      .attr("transform", (_, i) => `translate(${i * 40}, 60)`)

    legendGroup.append("rect")
      .attr("x", (_, i) => i * 180 + 165)
      .attr("y", height - 100)
      .attr("width", 25)
      .attr("height", 25)
      .attr("fill", d => d.color)

    legendGroup.append("text")
      .attr("x", (_, i) => i * 180 + 160)
      .attr("y", height - 80)
      .style("text-anchor", "end")
      .text(d => d.name)

    const root = tree().size([380, 300])(hierarchy(bubbles))

    svg.selectAll(".circle")
      .data(root.children)
      .join("circle")
      .attr("class", "circle")
      .transition()
      .duration(2000)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 3)
      .attr("fill", "#57d7ec")

    svg.selectAll(".line")
      .data(root.children)
      .join("polyline")
      .attr("class", "line")
      .transition()
      .duration(2000)
      .attr("points", d => `
        ${x((d.data as Mutation).position)},40
        ${x((d.data as Mutation).position)},160
        ${d.x},300
       `)
      .attr("fill", "none")
      .attr("stroke", "#57d7ec")

    svg.selectAll(".domain")
      .attr("cursor", "pointer")
      .on("click", () => {
      alert(123)
    })

    svg.selectAll(".circle")
      .attr("cursor", "pointer")
      .on("click", (_,d) => {
        // @ts-ignore
        alert(`name: ${d.data.name}, position: ${d.data.position}`)
      })
  })

  return <div id={"area"}/>
}
