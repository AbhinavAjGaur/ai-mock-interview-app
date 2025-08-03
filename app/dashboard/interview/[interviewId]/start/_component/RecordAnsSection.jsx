"use client";
import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {

  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prvAns => prvAns + result?.transcript)
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);


  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();      
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      console.log(userAnswer);
      setLoading(true);

      // ---- INSERTED LOGGING START ----
      console.log('mockInterviewQuestion:', mockInterviewQuestion);
      console.log('activeQuestionIndex:', activeQuestionIndex);
      console.log('Saving question:', mockInterviewQuestion[activeQuestionIndex]?.question);
      // ---- INSERTED LOGGING END ----

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. ` +
        "Depends on the question and user's answer for given interview question. " +
        "Please give us a rating out of 10 for the answers and feedback as an area of improvement in 50 words, if any. " +
        "Provide the response in JSON format with 'rating' and 'feedback' fields.";


      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```','');
      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp.feedback,
          rating: JsonFeedbackResp.rating,
          userEmail: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });

      if (resp) {
        toast('User Answer recorded successfully');
      }
      setUserAnswer('');
      setResults([]);
    } catch (error) {
      console.error('Error updating user answer:', error);
      toast('Failed to record user answer. Please try again.', { type: 'error' });
    } finally {
      setResults([]);
      setLoading(false);
    }
  };


  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col my-20 justify-center items-center gap-10 bg-black rounded-lg p-5 ml-10'>
        <Image src={'/webcam.png'} width={200} height={200} alt='webcam' className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      <Button disabled={loading} variant="outline" className="my-5 bg-primary hover:bg-blue-600" onClick={StartStopRecording}>
        {isRecording ?
          <h2 className='text-red-600 flex gap-2'>
            <StopCircle />Stop Recording
          </h2>
          :
          <h2 className='text-white flex gap-2 items-center'>
            <Mic /> Record Answer
          </h2>}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
