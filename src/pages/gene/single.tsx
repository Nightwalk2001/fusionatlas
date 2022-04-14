import {SingleGeneChart}     from "@/charts"
import {getter}              from "@/libs"
import {useEffect, useState} from "react"

const single = () => {
  const [data, setData] = useState<SingleGeneLncs>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getter<SingleGeneLncs>(`/gene/single/AACS`)
      setData(res)
    }

    fetchData().then()
  }, [])

  return <div>
    {data && <SingleGeneChart gtex={data.gtex} tcga={data.tcga}/>}
  </div>
}

export default single
