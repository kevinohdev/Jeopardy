import React, { useEffect, useState } from 'react'

const Categories = () => {
  const [clues, setClues] = useState<Clue[]>([])
  const [error, setError] = useState({})
  const [showAnser, setShowAnswer] = useState(false)
  const [index, setIndex] = useState(0);
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
    fetch('http://jservice.io/api/clues')
      .then(response => response.json())
      .then(res => setClues(res.slice(0, 10)))
      .catch(err => setError(err))
  }, [])

  console.log(clues)

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
    <div className="container mx-auto bg-sky-500 min-h-screen grid grid-cols-1 grid-rows-3 justify-center  " >
      <div className='min-w-full text-center'>

        <div className='border-4 p-4'>{clues[index]?.category.title} - ${clues[index]?.value}</div>
        {showAnser && <div>{clues[index]?.answer}</div>}

      </div>
      <div className='grid grid-cols-2 min-w-full text-center border-4 p-4'>
        <div className='border-4 p-4' onClick={handleClick}>
          {clues[index]?.question}
        </div>
        <div className='border-4 p-4' onClick={showNext}>
          <div>{score}</div>
          <div>name</div>
        </div>
        <div className='border-4 p-4' onClick={correctAnswer}>
          <button type='button'>Correct</button>
        </div>
        <div className='border-4 p-4' onClick={incorrectAnswer}>
          <button type='button'>Incorrect</button>
        </div>
      </div>
    </div>
  )
}

export default Categories