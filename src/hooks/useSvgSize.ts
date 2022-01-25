export const useSvgSize = (w: number, h: number, margin: { left: number, right: number, top: number, bottom: number }) => {
    const width  = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom
    return {w, h, width, height}
}