import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Select } from './stories/Select'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Select />
      <hr/>
      <Select multiple={false}  withSearch={false} />
      <hr/>
      <Select multiple={false}  withSearch={false} outlined={false} />
    </>
  )
}

export default App
