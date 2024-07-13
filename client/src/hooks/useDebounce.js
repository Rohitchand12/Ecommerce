import { useEffect, useState } from "react"

function useDebounce(value) {
    const [debouncedValue,setDebounceValue] = useState(value)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(value);
        },500 )

        return ()=>clearTimeout(timer);
    },[value])
    return debouncedValue;
}

export default useDebounce