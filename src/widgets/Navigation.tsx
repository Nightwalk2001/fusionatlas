import {DocSearch}  from "@docsearch/react"
import Link         from "next/link"
import React        from "react"
import {NavPopover} from "./NavPopover"

export const Navigation = () =>
  <div
    className="relative pt-2 lg:pt-3 flex items-center justify-between
     text-gray-700 font-semibold text-sm leading-6 dark:text-gray-200">
    <div className={"flex justify-between items-center w-5/6 mx-auto pt-4"}>

      <Link href={"/"} passHref>
        <div className={"flex items-center space-x-2 cursor-pointer"}>
          <img
            src={require("@/images/nav/matlab.svg").default}
            alt={"back to home"}
            width={34}
            height={34}
          />
          <span
            className={"font-semibold text-2xl tracking-tighter text-[#0f172a]"}>fusion atlas</span>
        </div>
      </Link>

      <div className={"flex justify-between items-center w-[450px] text-md text-gray-600"}>

        <div className={"flex space-x-4"}>
          <NavPopover
            btn={<span className={"font-semibold transition hover:text-[#38bdf8]"}>Fusion</span>}
            panel={
              <>
                <div className={"columns-2 items-start space-y-3 px-5"}>
                  <SvgLink logo={"browser.svg"} to={"/browse"}
                           title={"Browse"} subtitle={"FusionAtlas browser"}/>
                  <SvgLink logo={"search2.svg"} to={"/search"}
                           title={"Search"} subtitle={"Search for desired fusions"}/>
                  <SvgLink logo={"drug3.svg"} to={"/drug"}
                           title={"Drug"} subtitle={"Interactive analysis of fusions & drugs"}/>
                  <SvgLink logo={"prediction.svg"} to={"/fusion/prediction"}
                           title={"Predict"} subtitle={"Predict fusions by exon counts"}/>
                  <SvgLink logo={"list.svg"} to={"/fusion/prediction"}
                           title={"Prioritize"} subtitle={"Rank fusions by fusion cells quantification"}/>
                  <SvgLink logo={"analysis.svg"} to={"/fusion/prediction"}
                           title={"Analysis"} subtitle={"Interactive functional analysis of fusions"}/>
                  {/*<SvgLink logo={"dna.svg"} to={"/gene/single"} title={"Drug"}*/}
                  {/*         subtitle={"LncRNA Expression (single gene)"}/>*/}
                  {/*<SvgLink logo={"science.svg"} to={"/gene/multi"} title={"Drug"}*/}
                  {/*         subtitle={"LncRNA Expression (multiple genes)"}/>*/}
                </div>
              </>
            }
            maxW={"max-w-lg"}
          />

          <NavPopover
            btn={<span className={"font-semibold transition hover:text-[#38bdf8]"}>Support</span>}
            panel={
              <>
                <div className={"flex flex-col items-start space-y-3 px-5"}>
                  <SvgLink logo={"document1.svg"} to={"/help"}
                           title={"Tutorial"} subtitle={"Helpful suggestions"}/>
                  <SvgLink logo={"database.svg"} to={"/download"}
                           title={"Download"} subtitle={"Data files of FusionAtlas."}/>
                  <SvgLink logo={"business.svg"} to={"/contact"}
                           title={"Contact"} subtitle={"Contact & feedback"}/>
                </div>
              </>
            }/>

          <div className={"font-semibold"}>Contact</div>
        </div>

        <div className={"w-[1px] h-[25px] bg-[#e2e8f0]"}/>

        <div className={"flex justify-between items-center"}>
          <svg fill="currentColor" viewBox="0 0 20 20" className={"w-6 h-6 text-cyan-500 cursor-pointer"}>
            <path fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"/>
          </svg>
          <DocSearch
            appId="R2IYF7ETH7"
            apiKey="599cec31baffa4868cae4e79f180729b"
            indexName="docsearch"
          />
        </div>

      </div>
    </div>
  </div>


type Props = {
  logo: string
  to: string
  title: string
  subtitle: string
}

const SvgLink = ({logo, to, title, subtitle}: Props) =>
  <div className={"flex justify-between space-x-5 w-full h-18"}>
    <img src={require(`@/images/nav/${logo}`).default} width={44} height={44} alt={""}
         className={"object-cover min-h-[44px] max-h-[44px]"}/>
    <div className={"flex flex-col justify-start space-y-0.5 grow max-w-[215px]"}>
      <Link href={to} passHref>
        <span
          className={`text-lg font-semibold text-gray-500 cursor-pointer 
          transition hover:text-cyan-300 hover:text-shadow-2xl`}>{title}</span>
      </Link>
      <span className={"text-sm font-tumor.json text-gray-400"}>{subtitle}</span>
    </div>
  </div>
