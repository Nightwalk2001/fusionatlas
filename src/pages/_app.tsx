import "@/styles/index.css"
import {Copyright} from "@/widgets"
import type {AppProps} from "next/app"

const App = ({Component, pageProps}: AppProps) => <div className={"flex flex-col min-w-[100%] min-h-[100vh]"}>
  <div className={"flex-1"}>
    <Component {...pageProps} />
  </div>
  <Copyright/>
</div>

export default App
