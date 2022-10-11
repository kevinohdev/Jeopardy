import Categories from './Components/Categories'



function App() {

  const clues = async () => await fetch('https://jservice.io/api/clues')
    .then((response) => response.json())
    .then((data) => console.log(data))



  return (
    <div className='bg-gray-900'>
      <Categories></Categories>
    </div>
  )
}

export default App
