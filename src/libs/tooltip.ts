import {Selection} from "d3"
import React       from "react"

type TooltipDiv = false | Selection<HTMLDivElement, any, any, any>

export const showTooltip = <T>(
    event: React.MouseEvent,
    tooltip: false | TooltipDiv,
    data: T) => {
    if (tooltip) {
        // const pos = pointer(event)

        let key: (keyof T)
        for (key in data)
            if (data[key]) {
                tooltip.select(".keys").append("div").attr("class", "tmp").html(key)
                tooltip.select(".values").append("div").attr("class", "tmp").html(`${data[key]}`)
            }

        tooltip
            .style("left", event.clientX + 10 + "px")
            .style("top", event.clientY + 15 + "px")
            .style("visibility", "visible")
    }
}

export const hideTooltip = (tooltip: TooltipDiv) => {
    if (tooltip) {
        tooltip.selectAll(".tmp").remove()
        tooltip.style("visibility", "hidden")
    }
}