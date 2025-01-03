"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import Link from 'next/link';

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null); // Initialize as null
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const interviewId = params.interviewId;

  useEffect(() => {
    if (params) {
      console.log(interviewId);
      GetInterviewDetails();
    }
  }, [params])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    console.log(result);
    setInterviewData(result[0]); // Store the first result
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        {/* Information Section */}
        <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
            <h2><strong>Job Role/Job Position:</strong> {interviewData?.jobPosition || "Loading..."}</h2>
            <h2><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc || "Loading..."}</h2>
            <h2><strong>Years of Experience:</strong> {interviewData?.jobExperience || "Loading..."}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3' >{process.env.NEXT_PUBLIC_INFORMATON}</h2>
          </div>
        </div>

        {/* Camera Section */}
        <div>
          {webCamEnabled ? <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{
              height: 300,
              width: 300
            }} /> :
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button varient="ghost" onClick={() => setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
            </>
          }
        </div>

      </div>
      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
