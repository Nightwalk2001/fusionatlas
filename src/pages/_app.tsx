import {getter}                from "@/libs"
import "@/styles/index.css"
import {Copyright, Navigation} from "@/widgets"
import type {AppProps}         from "next/app"
import {useRouter}             from "next/router"
import {RecoilRoot}            from "recoil"
import {SWRConfig}             from "swr"

const app = ({Component, pageProps}: AppProps) => {
  const router = useRouter()
  return <div className={"flex flex-col min-w-[100%] min-h-[100vh]"}>
    <RecoilRoot>
      {router.pathname !== "/" && <Navigation/>}
      <div className={"flex-1 relative"}>
        <SWRConfig value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher: getter
        }}>
          <Component {...pageProps}/>
        </SWRConfig>
      </div>
      <Copyright/>
    </RecoilRoot>
  </div>
}
export default app
