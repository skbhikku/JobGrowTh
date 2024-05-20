import React from 'react'

function QuizResult(props) {
  return (
    <>
    <div className='show-score text-center'>
        Your Score:{props.score}<br/>
        Total Score:{props.totalScore}
        <p  onClick={props.tryAgain}><p><strong>Completed</strong></p></p>
        <a href="/home" style={{textDecoration:'none'}}>Back to home</a>
    </div>
    </>
  )
}

export default QuizResult