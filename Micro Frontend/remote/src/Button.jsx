import { useState } from "react"
import useCount from "./store"
import Nota from "./Nota"

const Button = ()=>{
    const [count, setCount] = useCount()
    return (
        <div>
            <h2>Remote App</h2>
            <button onClick={()=>{setCount(count+1)}}>Click me: {count}</button>
            <Nota/>
        </div>
    )
}

export default Button