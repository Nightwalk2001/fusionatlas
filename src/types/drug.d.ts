declare type CellFusion = {
    cancer: string
    sample: string
    fusion: string
    reads: Int
    breakpoint1: string
    breakpoint2: string
    type: string
    confidence: string
}

declare type Drug = {
    name: string
    sample: string
    auc: number
}