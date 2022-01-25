import {BarStackChart, ChordChart, FusionPlot} from "@/charts"
import {Navigation} from "@/widgets"
import type {NextPage} from "next"

const Browse: NextPage = () => {
  return <div>
    <Navigation/>
    <FusionPlot/>
    <ChordChart/>
    <BarStackChart/>
    <div className={"w-[900px] mx-auto"}>
      <div className={"columns-5 space-y-10"}>
        <div>
          By Study
          <ul>
            <li>TCGA</li>
            <li>GTEx</li>
            <li>CCLE</li>
          </ul>
        </div>

        <div>
          BySampleType
          <ul>
            <li>TumorTissues</li>
            <li>NormalTissues</li>
            <li>Cell lines</li>
          </ul>
        </div>

        <div>
          By Cancer
          <ul>
            <li>LIHC</li>
            <li>BRCA</li>
            <li>……</li>
          </ul>
        </div>

        <div>
          By Gender
          <ul>
            <li>male</li>
            <li>female</li>
            <li>……</li>
          </ul>
        </div>

        <div>
          By VirusInfection
          <ul>
            <li>HBV</li>
            <li>HPV</li>
            <li>……</li>
          </ul>
        </div>

        <div>
          By FusionType
          <ul>
            <li>FPP</li>
            <li>FPL</li>
            <li>FLP</li>
            <li>FLL</li>
          </ul>
        </div>

        <div>
          By DataType
          <ul>
            <li>DNA-seq</li>
            <li>RNA-seq</li>
          </ul>
        </div>

        <div>
          By Frequency
          <input placeholder={"set cutoff >= N"}/>
        </div>

        <div>
          By EvidenceLevel
          <ul>
            <li>High</li>
            <li>Middle</li>
          </ul>
        </div>

        <div>
          By Tools
          <ul>
            <li>Arriba</li>
            <li>STAR-Fusion</li>
            <li>PRADA</li>
            <li>...</li>
          </ul>
        </div>

        <div>
          By Source
          <ul>
            <li>DNA-derived</li>
            <li>RNA-derived</li>
            <li>Others</li>
          </ul>
        </div>

      </div>

      <table>
        <thead>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default Browse
