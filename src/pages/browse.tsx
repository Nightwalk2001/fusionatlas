import Seven from "@/assets/sven_gods_strength.png"
import {Navigation} from "@/features"
import {Button} from "@/widgets"
import type {NextPage} from "next"

const Browse: NextPage = () => {
  return <div>
    <Navigation/>
    <img src={Seven} alt={""}/>
    <Button>123</Button>
  </div>
}

export default Browse
