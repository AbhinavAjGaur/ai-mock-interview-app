// Debugging Notes:
// The console output reveals that mockInterviewQuestion is an object, not an array.
// Specifically, it has a property interviewQuestions that is an array.
// This explains why the .map() function is not working directly on mockInterviewQuestion.

// Solution:
// Update the code to access the interviewQuestions property of mockInterviewQuestion.

import React from 'react'; 
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech');
    }
  };

  // Safely access interviewQuestions array
  const questions = mockInterviewQuestion?.interviewQuestions || [];

  return (
    <div className='p-5 mt-10 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {questions.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index && 'bg-slate-950 text-white'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className='my-5 text-md md:text-lg '>{questions[activeQuestionIndex]?.question}</h2>
      <Volume2
        className='cursor-pointer'
        onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
      />

      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-5 items-center text-blue-500'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
