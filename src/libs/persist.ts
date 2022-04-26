export const serialize = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value))

export const deserialize = <T>(key: string): T => JSON.parse(localStorage.getItem(key)!)
