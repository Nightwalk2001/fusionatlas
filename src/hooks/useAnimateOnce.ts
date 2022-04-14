import {useInView} from "react-intersection-observer"

export const useAnimateOnce = () => useInView({triggerOnce: true})