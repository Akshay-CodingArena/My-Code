import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from "remoteApp/Button"
import useCount from 'remoteApp/store'

function App() {
  const [count, setCount] = useCount()

  return (
    <>
      <div>
       <h1>Host Application</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button/>
       </div>
    </>
  )
}

export default App
