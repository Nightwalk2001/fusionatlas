import type {NextPage}         from "next"
import Head                    from "next/head"
import {ChangeEvent, useState} from "react"

const search: NextPage = () => {
  const [query, setQuery] = useState<string>("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)

  const handleSearch = () => {

  }

  return <div className={"absolute x-center top-1/2 -translate-y-1/2 text-center"}>
    <Head>
      <title>搜索基因、染色体、样本等搜索融合基因</title>
    </Head>

    <input
      type={"search"}
      placeholder={"search"}
      className={"w-xl px-4 py-2.5 text-cyan-300 bg-gray-100 rounded-md focus:outline-none"}
      onChange={handleChange}
    />
    <div className={"mt-3 text-sm"}>
      examples：TP53，TP53--BRCA1，chr1，chr1:100000-200000
    </div>
  </div>
}

export default search
