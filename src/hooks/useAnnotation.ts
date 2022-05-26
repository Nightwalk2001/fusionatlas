import {chrom, end, start} from "@/libs"
import useSWR              from "swr"

export const useAnnotation = <T>(prefix: string, exons: Exon[]) =>
    useSWR<T>(() => `/${prefix}s?chrom=${chrom(exons)}&start=${start(exons)}&end=${end(exons)}`)