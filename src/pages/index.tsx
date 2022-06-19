import {WindChart} from "@/charts"
import {Navigation} from "@/widgets"
import clsx from "clsx"
import Head from "next/head"
import styles from "./index.module.css"

const Header = () => <div className={"relative pb-10"}>

  <Head>
    <title>fusionatlas: a tool for find the linked fusion genes</title>
  </Head>

  <div className="px-4 sm:px-6 md:px-8">
    <div
      className={clsx(
        "absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-gray-50 dark:bg-[#0B1120]",
        styles.beams
      )}
    >
      <div
        className={`absolute inset-0 bg-grid-gray-900/[0.04] bg-[bottom_1px_center] 
        dark:bg-grid-gray-400/[0.05] dark:bg-bottom dark:border-b dark:border-gray-100/5`}
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)"
        }}
      />
    </div>
  </div>

  <Navigation/>

  <div className="relative max-w-5xl mx-auto pt-20 text-center sm:pt-24 lg:pt-32">
    <h1
      className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
      Pan-cancer lncRNA Fusion Atlas
    </h1>
    <p className="mt-6 text-lg text-gray-600 text-center max-w-xl mx-auto dark:text-gray-400">
      Comprehensive analysis of lncRNA gene fusions
      in <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
      10000+ samples</code> across <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
      33 cancer</code> types
    </p>

    <div className={"flex flex-col items-center mb-10"}>
      <div className={"flex my-10"}>
        <button
          className={"mr-12 px-3.5 py-2.5 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-400"}>
          quick start
        </button>
        <button
          className={"px-3.5 py-2.5 text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"}>
          documentation
        </button>
      </div>
    </div>
  </div>

  <div className={"-mt-12 h-36"}/>

</div>

const Home = () => {
  return <div className="mb-20 space-y-12 overflow-hidden sm:mb-32 sm:space-y-16 md:mb-40 md:space-y-20">
    <Header/>

    <div className={"flex justify-between items-center space-x-10 w-4/5 mx-auto"}>
      <img src={require("@/images/lstm.jpg").default} alt={""}/>
      <div>
        <h2 className={"mb-4 text-3xl font-semibold"}>Predict with exon RNA-seq counts</h2>
        <p className={"text-lg"}>
          A method using exon RNA-seq counts of
          a pair of gene from multiple experiments
          to infer if there are fusions between them.
        </p>
      </div>
    </div>

    <WindChart/>

    {/*<div className={"flex justify-between items-center w-4/5 mx-auto"}>*/}
    {/*  <div className={"mr-20"}>*/}
    {/*    <h2 className={"mb-4 text-3xl font-semibold"}>LncRNA Expression (single gene)</h2>*/}
    {/*    <p className={"text-lg"}>*/}
    {/*      A method using exon RNA-seq counts of*/}
    {/*      a pair of gene from multiple experiments*/}
    {/*      to infer if there are fusions between them.*/}
    {/*    </p>*/}
    {/*  </div>*/}
    {/*  <img src={require("@/images/single_gene.svg").default} alt="" className={"w-2/5"}/>*/}
    {/*</div>*/}

    {/*<div className={"flex justify-between items-center w-4/5 mx-auto"}>*/}
    {/*  <img src={require("@/images/expression.png").default} alt={""} className={"w-2/5"}/>*/}
    {/*  <div className={"ml-20"}>*/}
    {/*    <h2 className={"mb-4 text-3xl font-semibold"}>Predict with exon RNA-seq counts</h2>*/}
    {/*    <p className={"text-lg"}>*/}
    {/*      A method using exon RNA-seq counts of*/}
    {/*      a pair of gene from multiple experiments*/}
    {/*      to infer if there are fusions between them.*/}
    {/*    </p>*/}
    {/*  </div>*/}
    {/*</div>*/}
  </div>
}

export default Home
