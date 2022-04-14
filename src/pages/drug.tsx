import {BoxChart}                     from "@/charts"
import {debounce}                     from "@/libs"
import {Table, Thead}                 from "@/widgets"
import {NextPage}                     from "next"
import Head                           from "next/head"
import React, {ChangeEvent, useState} from "react"
import useSWR                         from "swr"

type Data = {
  fusion: CellFusion
  auc: number
}[]

const headers = ["cancer", "sample", "fusions",
  "gene1", "gene2", "reads", "breakpoint1", "breakpoint2", "type", "confidence"]

const drug: NextPage = () => {
  const [query, setQuery] = useState<string>()
  const {data} = useSWR<Data>(() => query?.length ? `/cell_fusion/${query}` : null)
  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), 400)

  return <div className={"w-4/5 mx-auto text-center"}>
    <Head>
      <title>基于单细胞测序的药物分析</title>
    </Head>

    {/*<span*/}
    {/*  className="inline-block h-screen align-middle"*/}
    {/*  aria-hidden="true"*/}
    {/*>&#8203;</span>*/}
    <input
      type={"search"}
      placeholder={"search by fusions"}
      className={`w-96 h-12 pl-8 pr-3 py-2.5 bg-gray-100 rounded-md 
    transition-color duration-300 focus:text-white focus:placeholder-white focus:bg-cyan-300 focus:outline-none`}
      onChange={handleSearch}
    />

    {data?.length && <>
      <Table>
        <Thead headers={headers}/>
        <tbody className={"tbody"}>

          {data.map(i => i.fusion).slice(1, 40).map(d => {
            const [gene1, gene2] = d.fusion.split("--")
            return <tr
              key={d.cancer + d.sample + d.fusion}
              className={`text-center py-2 tr`}>
              <td>{d.cancer}</td>
              <td>{d.sample}</td>
              <td className={"max-w-xs overflow-x-scroll"}>
                {d.fusion}
              </td>
              <td className={"max-w-xs overflow-x-scroll"}>{gene1}</td>
              <td className={"max-w-xs overflow-x-scroll"}>{gene2}</td>
              <td>{d.reads}</td>
              <td>{d.breakpoint1}</td>
              <td>{d.breakpoint2}</td>
              <td>{d.type}</td>
              <td>{d.confidence}</td>
            </tr>
          })}
        </tbody>
      </Table>
      <BoxChart/>
    </>
    }
  </div>
}

export default drug
