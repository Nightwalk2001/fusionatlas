import React from "react"

export const Copyright: React.FC = () => {
  return <>
    <div className={"bg-gray-200 w-screen h-[1px]"}/>
    <div className={"w-9/12 mx-auto py-8 text-center"}>
      <div>Copyright© 2021 Xiong Lab Sun Yat-sen University, Guangzhou, Guangdong, China</div>
      <a href={"https://beian.miit.gov.cn/"} className={"text-xs text-gray-500"}>粤ICP备2021003175号</a>
    </div>
  </>
}
