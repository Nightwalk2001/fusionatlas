import {Table, Thead}  from "@/widgets"
import type {NextPage} from "next"
import Head            from "next/head"
import React           from "react"

const headers = ["file name", "file size", ""]

const download: NextPage = () => <div className={"w-4/5 mx-auto"}>
  <Head>
    <title>下载fusionatlas相关文件</title>
  </Head>

  <div>The interactive files</div>
  <Table>
    <Thead headers={headers}/>

    <tbody className={"tbody"}>

    </tbody>
  </Table>

</div>

export default download
