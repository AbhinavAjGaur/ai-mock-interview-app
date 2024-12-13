"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSection from './_component/QuestionSection';
import RecordAnsSection from './_component/RecordAnsSection';


function StartInterview() {
  const params = useParams();
  const interviewId = params.interviewId;
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion]=useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

   useEffect(() => {
    if (params) {
      console.log(interviewId);
      GetInterviewDetails();
    }
  }, [params])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    console.log(result);

    const jsonMockResp=JSON.parse(result[0].jsonMockResp)
    console.log(jsonMockResp);
    
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);

  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Question */}
          <QuestionSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          />

          {/* Video/Audio Recording */}
          <RecordAnsSection/>
      </div>
    </div>
  )
}

export default StartInterview