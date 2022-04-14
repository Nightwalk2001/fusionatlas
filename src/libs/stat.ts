import {quantile} from "d3"

export const stat = (numbers: number[]) => {
    const q1       = quantile(numbers, 0.25)!,
          median   = quantile(numbers, 0.5)!,
          q3       = quantile(numbers, 0.75)!,
          iqr      = q3 - q1,
          m0       = Math.min(...numbers),
          m1       = Math.max(...numbers),
          min      = Math.max(m0, q1 - iqr * 1.5),
          max      = Math.min(m1, q3 + iqr * 1.5),
          outliers = numbers.filter(i => i < min || i > max)

    return {q1, median, q3, min, max, outliers}
}
