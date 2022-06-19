declare type Transcript = {
    // seqName: string
    start: number
    end: number
    // geneType: string
    // geneName: string
    // transcriptName?: string | null
    exonNumber?: string | null
    // exonId?: string | null
    proteinId?: string | null
    strand: string
}

declare type Cnv = {
    sample: string
    start: number
    end: number
    value: number
}

declare type Snv = {
    sample: string
    // gene: string
    position: number
    // ref: string
    // alt: string
    // aminoAcidChange: string
    effect: string
    dnaVaf: number
}

declare type EcDna = {
    eccId: string
    start: number
    end: number
    cellType: "Cancer cell line"
        | "Cancer tissue"
        | "Healthy person"
        | string
}

declare type M6a = {
    sample: string
    start: number
    end: number
    strand: string
    fdr: number
    foldEnrichment: number
    region: string
    geneId: string
    tool: string
    species: string
    pvalue: number
}
