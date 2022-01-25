import {useEffect, useState} from "react"

const ACTION_KEY_DEFAULT = ["Ctrl ", "Control"]
const ACTION_KEY_APPLE = ["⌘", "Command"]

export const useActionKey = () => {
    let [actionKey, setActionKey] = useState<string[]>()

    useEffect(() => {
        if (typeof navigator !== "undefined")
            (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
                ? setActionKey(ACTION_KEY_APPLE)
                : setActionKey(ACTION_KEY_DEFAULT)

    }, [])

    return actionKey
}
