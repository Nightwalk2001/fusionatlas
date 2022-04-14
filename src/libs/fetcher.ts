import {API_URL} from "./constant"

const defaultOptions = {
    headers: {
        "Content-Type": "application/json"
    }
}

const resHandler   = (res: Response) => res.json(),
      errorhandler = (err: any) => console.log(err)

export const getter = <T>(url: string): Promise<T> => fetch(API_URL + url).then(resHandler, errorhandler)

export const poster = <T = any>(url: string, data: T) =>
    fetch(API_URL + url, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
        .then(resHandler, errorhandler)

export const deleter = (url: string) =>
    fetch(API_URL + url, {method: "DELETE"})
        .then(resHandler, errorhandler)