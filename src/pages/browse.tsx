import {BarStackChart, ExpressionChart, PieChart, RatioChart} from "@/charts"
import {getter, PAGE_SIZE, serialize}                         from "@/libs"
import {fusionState}                                          from "@/store"
import {Table, Thead}                                         from "@/widgets"
import {Pagination}                                           from "@/widgets/Pagination"
import type {NextPage}                                        from "next"
import Head                                                   from "next/head"
import {useRouter}                                            from "next/router"
import React, {useEffect, useState}                           from "react"
import {useSetRecoilState}                                    from "recoil"
import useSWR                                                 from "swr"

const untieBreakpoint = (info: string) => {
  const arr = info.split(":")
  return {chrom: "chr" + arr[0], breakpoint: +arr[1], strand: arr[2]}
}

const headers = ["cancer", "sample", "fusion", "gene1", "gene2",
  "reads", "breakpoint1", "breakpoint2", "type", "confidence"]

const data1 = {
  a: 327,
  b: 456,
  c: 567,
  d: 789,
  e: 224,
  f: 257,
  g: 279
}

const count = 300

const browse: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const // {data: count, mutate: mutateCount} = useSWR<number>("/fusion/count"),
    {data, mutate: mutate}           = useSWR<Fusion[]>(`/fusion/${page}`),
    {data: next, mutate: mutateNext} = useSWR<Fusion[]>(`/fusion/${page + 1}`)
  const [ribbons, setRibbons] = useState<number[][]>()
  const setFusion = useSetRecoilState(fusionState)

  const format = (d: string) => d === "X" ? 23 : d === "Y" ? 24 : d

  useEffect(() => {
    const fetchFusions = async () => {
      const source = data?.map(d => {
        const c1 = d.breakpoint1.split(":")[0],
              c2 = d.breakpoint2.split(":")[0]
        return `${format(c1)}-${format(c2)}`
      })

      const matrix: number[][] = []

      for (let i = 1; i <= 24; i++) {
        const row = []
        for (let j = 1; j <= 24; j++)
          row.push(source?.filter(d => d === `${i}-${j}`).length ?? 0)
        matrix.push(row)
      }

      setRibbons(matrix)
    }

    fetchFusions().then()
  }, [])

  const onFusionClicked = async (gene1: string, gene2: string, breakpoint1: string, breakpoint2: string) => {

    const {chrom: chrom1, breakpoint: b1, strand: strand1} = untieBreakpoint(breakpoint1)
    const {chrom: chrom2, breakpoint: b2, strand: strand2} = untieBreakpoint(breakpoint2)

    const fusion = {chrom1, chrom2, gene1, gene2, breakpoint1: b1, breakpoint2: b2, strand1, strand2}

    setFusion(fusion)
    serialize("fusion", fusion)
    await router.push("/fusion/single")
  }

  const onGeneClicked = async (gene: string) => {
    const res = await getter(`/multi/${gene}`)
  }

  return <div>
    <Head>
      <title>肿瘤基因融合数据库浏览器</title>
    </Head>
    <RatioChart
      name={"By cancer"}
      data={[{name: "TCGA", value: 123}, {name: "gTEX", value: 207}, {name: "g", value: 70}]}
    />

    <PieChart data={data1}/>

    {/*{ribbons && <ChordChart data={ribbons}/>}*/}
    <BarStackChart/>

    <div className={"h-10"}/>

    <ExpressionChart/>

    <div>
      {data &&
        <FusionTable
          data={data}
          onFusionClicked={onFusionClicked}
          onGeneClicked={onGeneClicked}
        />}
      {next && <FusionTable data={next} hidden/>}
      {count && count > PAGE_SIZE && <Pagination total={count} onPage={setPage}/>}
    </div>
  </div>
}

type Props = {
  data: Fusion[]
  hidden?: boolean
  onFusionClicked?: (gene1: string, gene2: string, breakpoint1: string, breakpoint2: string) => void
  onGeneClicked?: (gene: string) => void
}

const FusionTable = ({
                       data,
                       hidden,
                       onFusionClicked,
                       onGeneClicked
                     }: Props) =>
  <Table tableClass={`${hidden && "hidden"}`}>
    <Thead headers={headers}/>

    <tbody className={"tbody"}>
      {data.map((d, i) => {
        const {cancer, sample, gene1, gene2, breakpoint1, breakpoint2} = d
        return <tr
          key={i}
          className={`text-center py-2 tr`}>
          <td>{cancer}</td>
          <td>{sample}</td>
          <td className={"long-interact"}
              onClick={() => onFusionClicked?.(gene1, gene2, breakpoint1, breakpoint2)}>{gene1}-{gene2}</td>
          <td className={"long-interact"} onClick={() => onGeneClicked?.(gene1)}>{gene1}</td>
          <td className={"long-interact"} onClick={() => onGeneClicked?.(gene2)}>{gene2}</td>
          <td>{d.reads}</td>
          <td>{breakpoint1}</td>
          <td>{breakpoint2}</td>
          <td>{d.type}</td>
          <td>{d.confidence}</td>
        </tr>
      })}
    </tbody>
  </Table>

export default browse
