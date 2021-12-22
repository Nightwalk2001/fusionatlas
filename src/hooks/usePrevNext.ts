import {useRouter} from "next/router"
import {createContext, useContext} from "react"

const sidebarContext = createContext<{ nav: { category: string } }>({nav: {category: ""}})

export function usePrevNext() {
    let router = useRouter()
    let {nav} = useContext(sidebarContext)
    // @ts-ignore
    let pages = Object.keys(nav).flatMap((category) => nav[category])
    let pageIndex = pages.findIndex((page) => page.href === router.pathname)
    return {
        prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
        next: pageIndex > -1 ? pages[pageIndex + 1] : undefined
    }
}
