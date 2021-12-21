import {Menu} from "@headlessui/react"
import React  from "react"

type NaviItemProps = {
  href: string
  text: string
}

export const NaviItem: React.FC<NaviItemProps> = ({href, text}) => {

  const handleHref = () => console.log(1)

  return <Menu.Item>
    {({active}) => (
      <button
        className={`${
          active ? "bg-purple-400 text-white" : "text-gray-900"
        } rounded-md w-full px-2 py-2 text-sm`}
        onClick={handleHref}
      >
        {text}
      </button>
    )}
  </Menu.Item>
}
