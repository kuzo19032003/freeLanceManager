
import { useEffect, useState } from "react"

function useDebounce<T>(
    value: T,
    delay = 300
): T {

    const [debounce, setDebounce] = useState(value)

    useEffect(() => {

        const timer = setTimeout(() => setDebounce(value), delay)

        return () => clearTimeout(timer)

    }, [debounce, value])

    return debounce
}

export default useDebounce