import React, { useEffect, useState } from 'react'

const Categories = () => {
  const randomNumber = Math.floor(Math.random() * 101);

  const [clues, setClues] = useState<Clue[]>([])
  const [error, setError] = useState({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [index, setIndex] = useState(randomNumber);
  const [score, setScore] = useState(0);



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
    fetch('https://jservice.io/api/clues')
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

  return (
    <div className="container mx-auto min-h-screen flex flex-col" >
      <div className='grid grid-cols-2 justify-around min-w-full text-center font-robo  
      uppercase border-spacing-3'>
        <div className='bg-blue-700 m-1 p-4 text-white text-5xl'>
          {clues[index]?.category.title}
        </div>
        <div className='bg-blue-700 m-1 p-4 text-yellow-300 text-5xl'>
          ${clues[index]?.value}
        </div>
      </div >
      <div className='bg-blue-700 flex-1 text-center flex justify-center items-center m-1 text-3xl text-white font-fraunces uppercase p-10'>
        {!showAnswer && clues[index]?.question}
        {showAnswer && clues[index]?.answer}
      </div>
      <div className='grid grid-cols-4 min-w-full text-center text-gray-300'>
        <div className='bg-blue-700 m-1 p-4 font-extrabold' onClick={handleClick}>
          Reveal Answer
        </div>
        <div className='bg-blue-700 m-1 p-4 text-green-500 font-extrabold text-l' onClick={correctAnswer}>
          <button type='button'>Correct</button>
        </div>
        <div className='bg-blue-700 m-1 p-4 text-red-500 font-extrabold text-l' onClick={incorrectAnswer}>
          <button type='button'>Incorrect</button>
        </div>
        <div className='bg-blue-700 m-1 p-4 font-extrabold' onClick={showNext}>
          <button type='button'>Skip</button>
        </div>
      </div>
      <div className='font-robo flex flex-col min-w-full text-center'>
        <div className='bg-blue-700 m-1 p-4  text-white text-9xl'>${score}</div>
      </div>
    </div >
  )
}

export default Categories