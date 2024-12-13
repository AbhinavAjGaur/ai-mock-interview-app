import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnsSection() {

  const [userAnswer,setUserAnswer]=useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer(prvAns=>prvAns+result?.transcript)
    })
  },[results])

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
      <Button varient="outline" className="my-5" onClick={isRecording?stopSpeechToText:startSpeechToText}>
        {isRecording?
        <h2 className='text-red-600 flex gap-2'>
            <Mic/>Stop Recording
        </h2>
        :
        'Record Answer'}</Button>
        <Button onClick={()=>console.log(userAnswer)
        }>Show user answer</Button>
    </div>
  )
}

export default RecordAnsSection
