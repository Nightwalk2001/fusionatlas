export const chrom = (exons: Exon[]) => exons[0].chrom

export const start = (exons: Exon[]) => exons[0].start

export const end = (exons: Exon[]) => exons[exons.length - 1].end

export const geneLength = (exons: Exon[]) => exons[exons.length - 1].end - exons[0].start + exons.length * 2.5