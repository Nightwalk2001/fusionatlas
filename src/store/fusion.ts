import {CSR, deserialize} from "@/libs"
import {atom}             from "recoil"

export const fusionState = atom<FusionState>({
    key: "fusionState",
    default: CSR ? deserialize("fusion") : {
        "chrom1": "chr12",
        "chrom2": "chr12",
        "gene1": "A2M",
        "gene2": "NONHSAG106689.1",
        "breakpoint1": 9110314,
        "breakpoint2": 9449733,
        "strand1": "-",
        "strand2": "-"
    }
})
