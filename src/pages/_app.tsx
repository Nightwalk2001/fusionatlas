import type {AppProps} from "next/app"
import {Copyright} from "../features"
import "../styles/index.css"

const App = ({Component, pageProps}: AppProps) => <>
    <div className={"flex flex-col min-w-[100%] min-h-[100vh]"}>
        {/*<Navigation/>*/}
        <div className={"flex-1"}>
            <Component {...pageProps} />
        </div>
        <Copyright/>
    </div>

    <style jsx={true}>{`
      .root {
        background-image: url("bg.webp");
        background-size: 150rem;
      }
    `}</style>
</>

export default App
