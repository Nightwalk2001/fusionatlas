import {extent} from "d3-array"

export const minMax = <T extends obj, K extends keyof T>(arr: Iterable<T>, attr: K) => extent(arr, d => d[attr]) as [number, number]