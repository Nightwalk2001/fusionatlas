import {Popover, Transition} from "@headlessui/react"
import React                 from "react"

export type NavPopoverProps = {
  btn: React.ReactNode
  panel: React.ReactNode
  maxW?: string
}

export const NavPopover = ({btn, panel, maxW = "max-w-xs"}: NavPopoverProps) =>
  <Popover className={"relative"}>
    <Popover.Button>
      {btn}
    </Popover.Button>

    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1">
      <Popover.Panel className={`absolute z-10 w-screen ${maxW} py-4 mt-1
               x-center bg-white rounded-lg shadow-2xl shadow-purple-50 sm:pl-2`}>
        {panel}
      </Popover.Panel>
    </Transition>
  </Popover>