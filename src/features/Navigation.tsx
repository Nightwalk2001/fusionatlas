import "@docsearch/css"
import {DocSearch} from "@docsearch/react"
import {SunIcon} from "@heroicons/react/outline"
import React from "react"

export const Navigation: React.FC = () => {

  const linkClass = ({isActive}: { isActive: boolean; }) => `hover:text-indigo-200 ${isActive && "text-indigo-400 font-semibold"}`

  return <div className={"flex justify-between items-center w-10/12 mx-auto pt-4"}>

    <div className={"flex items-center space-x-2 cursor-pointer"}>
      <img
        src={"/wish.svg"}
        alt={"back to home"}
        height={32}
      />
      <span className={"font-ff font-semibold text-2xl text-[#0f172a]"}>fusion atlas</span>
    </div>

    <div className={"flex justify-between items-center w-[380px] text-md font-semibold text-gray-600"}>

      <div>Fusion paint</div>

      <div>Paint more</div>

      <SunIcon className={"w-6 h-6 text-cyan-500"}/>

      <DocSearch
        appId="R2IYF7ETH7"
        apiKey="599cec31baffa4868cae4e79f180729b"
        indexName="docsearch"
      />

    </div>
  </div>
}
