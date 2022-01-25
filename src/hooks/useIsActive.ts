import {useRouter} from "next/router"

export const useIsActive = (path: string) => {
    const router = useRouter()

    return router.pathname === path
}
