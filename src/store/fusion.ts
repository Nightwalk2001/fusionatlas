import {deserialize} from "@/libs"
import {atom}        from "recoil"

export const fusionState = atom<FusionState>({
    key: "fusionState",
    default: deserialize("fusion")
})
