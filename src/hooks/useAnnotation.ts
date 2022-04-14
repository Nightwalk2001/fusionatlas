import {chrom, end, start} from "@/libs"
import useSWR              from "swr"

export const useAnnotation = <T>(prefix: string, exons: Exon[]) =>
    useSWR<T>(() => `/${prefix}/${chrom(exons)}/${start(exons)}/${end(exons)}`)