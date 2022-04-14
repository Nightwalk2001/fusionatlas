export const hugeDiff = (num1: number, num2: number) => {
    const former = num1 / num2 > 4,
          latter = num1 / num2 < 0.25,
          huge   = former || latter,
          ratio  = num1 / (num1 + num2)

    return {huge, former, ratio}
}