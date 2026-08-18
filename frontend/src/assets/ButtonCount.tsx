import { useState } from "react";

export default function Button(){
    const [count, setCount] = useState(0)
    return (
        <button onClick={() => setCount(prevCount => prevCount + 1)}>{count}</button>
    )
}