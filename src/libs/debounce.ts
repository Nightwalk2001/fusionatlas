export const debounce = (func: Function, wait: number, immediate: boolean = false) => {
    let timeout: NodeJS.Timeout | null

    return function (this: any) {
        let context = this, args = arguments
        clearTimeout(<NodeJS.Timeout>timeout)
        timeout = setTimeout(function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }, wait)
        if (immediate && !timeout) func.apply(context, args)
    }
}
