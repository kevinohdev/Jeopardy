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
    <div className="container mx-auto bg-sky-500 min-h-screen flex flex-col justify-center  " >
      <div className='min-w-full text-center border-4 p-4'>
        {clues[index]?.category.title} - ${clues[index]?.value}
      </div>
      <div className='min-w-full flex-1 text-center border-4 p-4 flex justify-center items-center'>
        {!showAnser && clues[index]?.question}
        {showAnser && clues[index]?.answer}
      </div>
      <div className='grid grid-cols-4 min-w-full text-center border-4 p-4'>
        <div className='border-4 p-4' onClick={handleClick}>
          Reveal Answer
        </div>
        <div className='border-4 p-4' onClick={correctAnswer}>
          <button type='button'>Correct</button>
        </div>
        <div className='border-4 p-4' onClick={incorrectAnswer}>
          <button type='button'>Incorrect</button>
        </div>
        <div className='border-4 p-4' onClick={incorrectAnswer}>
          <button type='button'>Skip</button>
        </div>
      </div>
      <div className='flex flex-col min-w-full text-center border-4 p-4'>
        <div className='border-4 p-4'>${score}</div>
        <div className='border-4 p-4'>{name}</div>
        <form>
          <input placeholder='enter name'></input>
          <button type='submit'>x</button>
        </form>
      </div>
    </div >
  )
}

export default Categories