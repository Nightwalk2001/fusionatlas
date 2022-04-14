import {useRef} from "react"

export const Predict = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const uploadFile = () => {
    const i = fileRef.current!
    i.click()
  }

  return <>
    <h2>Predict Fusion with our trained model</h2>
    <h3>Training Process</h3>
    <img src={require("@/images/predict/s1.png").default} alt={""} className={"w-3/4 mx-auto"}/>

    <h3>Upload format</h3>
    <h4>Input format example with annotations:</h4>
    <pre>{`
//standard input format with annotation
1
// type: when type=1,we evaluate whether there is fusion between every two genes in your file
// when type=2,we evaluate whether there is fusion between  0th gene and 1th gene, 2th gene and 3th gene,(i)th gene and (i+1)th gene
gene0
//line with only one 'word'(no space inside) is regarded as gene name thus a separator for data of different gene
1 3 2 4 5
3 6 7 2 8
//one line for each exon,in which data of each experiment is seperated by space
//The gene you use shouldn't have too many exons, less than 15 for the best.
//This is due to LSTM's input size.
//If you want to do prediction on genes with much more exons,you can adjust the code, and train a model yourself.
 //The code is on github:    https://github.com/faded53222/Predict-fusions-using-exon-counts
4 2 19 0.5 0
gene1
14 53 45 67 123 33 234 123
23 54 63 13 424 44 115 435
//the number of exons can differ in different genes
//the number of experiments can differ in exons from different genes,but should be same in the same gene
gene2
90 123 435 542 123 342 12231
`}</pre>
    <h4>Output format example with annotations:</h4>
    <pre>{`
Most likely possible fusion pairs:
gene0\tgene1\t0.888
//Gene pairs with fusion possibility more than 0.7 are selected as predicted fusion pairs.
//The fusion possibility of other pairs are also shown below.
//The value is actually the model's output , whose range is [0,1].
Fusion possibility between all other pairs:
gene1\tgene2\t0.333
gene0\tgene2\t0.222
    `}</pre>

    <input type="file" ref={fileRef} className={"hidden"}/>
    <button onClick={uploadFile}>点击上传文件</button>
  </>
}