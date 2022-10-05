import { useState } from 'react'
import Categories from './Components/Categories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-blue-700'>
      <Categories></Categories>
    </div>
  )
}

export default App
