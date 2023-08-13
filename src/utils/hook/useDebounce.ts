import { useEffect, useState } from 'react'

const useDebounce = (value: string, deplay: number) => {
    const [debounceValue, setDebounceValue] = useState<string>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, deplay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, deplay])

    return debounceValue
}

export default useDebounce
