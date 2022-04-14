declare type Fusion = {
    cancer: string
    sample: string
    reads: number
    gene1: string
    gene2: string
    breakpoint1: string
    breakpoint2: string
    type: string
    confidence: string
}

declare type FusionState = {
    chrom1: string
    chrom2: string
    gene1: string
    gene2: string
    breakpoint1: number
    breakpoint2: number
    strand1: string
    strand2: string
}

declare type Exon = {
    chrom?: string
    start: number
    end: number
}

declare type Gene = {
    name: string
    id: string
    chrom: string
    breakpoint1: number
    breakpoint2: number
    exons: Exon[]
}