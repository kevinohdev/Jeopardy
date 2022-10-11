import React, { useEffect, useState } from 'react'

const Categories = () => {
  const [clues, setClues] = useState<Clue[]>([])
  const [error, setError] = useState({})
  const [showAnser, setShowAnswer] = useState(false)
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('')


  interface Clue {
    id: number;
    question: string;
    value: number;
    category: {
      title: string;
    }
    answer: string;
  }

  useEffect(() => {
    fetch('http://jservice.io/api/clues')
      .then(response => response.json())
      .then(res => setClues(res))
      .catch(err => setError(err))
  }, [])


  const handleClick = () => {
    //when the Clue is clicked, reveal the answer
    setShowAnswer(prev => !prev)
  }

  const showNext = () => {
    if (index === clues.length - 1) {
      setIndex(0)
    }
    setIndex(prev => prev + 1)
    setShowAnswer(false);
  }

  const correctAnswer = () => {
    setScore(prev => prev + clues[index].value)
    showNext();
  }

  const incorrectAnswer = () => {
    setScore(prev => prev - clues[index].value)
    showNext();
  }

  console.log('henlo')

  return (
    <div className="container mx-auto min-h-screen flex flex-col" >
      <div className='grid grid-cols-2 justify-around min-w-full text-center font-robo uppercase border-spacing-3'>
        <div className='bg-blue-700 m-1'>
          {clues[index]?.category.title}
        </div>
        <div className='bg-blue-700 m-1'>
          ${clues[index]?.value}
        </div>
      </div >
      <div className='bg-blue-700 flex-1 text-center flex justify-center items-center m-1'>
        {!showAnser && clues[index]?.question}
        {showAnser && clues[index]?.answer}
      </div>
      <div className='grid grid-cols-4 min-w-full text-center '>
        <div className='bg-blue-700 m-1' onClick={handleClick}>
          Reveal Answer
        </div>
        <div className='bg-blue-700 m-1' onClick={correctAnswer}>
          <button type='button'>Correct</button>
        </div>
        <div className='bg-blue-700 m-1' onClick={incorrectAnswer}>
          <button type='button'>Incorrect</button>
        </div>
        <div className='bg-blue-700 m-1' onClick={incorrectAnswer}>
          <button type='button'>Skip</button>
        </div>
      </div>
      <div className='font-fraunces flex flex-col min-w-full text-center'>
        <div className='bg-blue-700 m-1'>${score}</div>
        <div className='bg-blue-700 m-1'>{name}</div>
        <form>
          <input className='bg-blue-700' placeholder='enter name'></input>
          <button className='bg-blue-700' type='submit'>x</button>
        </form>
      </div>
    </div >
  )
}

export default Categories