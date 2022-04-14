import {Background, Predict, Showcase} from "@/widgets"
import type {NextPage}                 from "next"
import Head                            from "next/head"

const prediction: NextPage = () => <article
  className={"prose lg:prose-lg flex flex-col w-3/4 min-w-[70%] max-w-3/4 mx-auto mt-20"}>

  <Head>
    <title>利用基于LSTM的深度神经网络，根据外显子个数进行序列预测</title>
  </Head>

  <Background/>

  <Predict/>

  <Showcase/>

  <a href={"https://github.com/faded53222/Predict-fusions-using-exon-counts"}>Code linkage</a>
</article>

export default prediction
