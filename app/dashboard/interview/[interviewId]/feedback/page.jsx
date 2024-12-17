"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating]= useState(null);
  const router=useRouter();
  const params = useParams();
  useEffect(() => {
    GetFeedback();
  },[]);
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    // console.log(result);
    setFeedbackList(result);

    const ratings = result.map((item)=> parseFloat(item.rating)).filter((rating)=>!isNaN(rating));
    const avgRating = ratings.length > 0 ?(ratings.reduce((acc, curr)=> acc + curr, 0) / ratings.length).toFixed(1) : "N/A";
    setAverageRating(avgRating);
  };
  return (
    <div className="p-10">
      
      {feedbackList?.length==0?
      <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>:
      <>
      <h2 className="text-3xl font-bold text-green-600">Congratulations!!🎉🎉</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-gray-700 text-lg my-3">
        Your overall rating: <strong>{averageRating}/5</strong>
      </h2>

      <h2 className="text-sm text-gray-600">
        Find below interview question with correct answer, your answer and
        feedback for improvement
      </h2>
      {feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <div key={index} className="my-5 border rounded-lg p-5">
            <Collapsible>
              <CollapsibleTrigger className="font-bold text-lg text-primary p-2 bg-secondary my-2 text-left flex justify-between gap-6 w-full">
                Question #{index + 1}: {item.question} <ChevronsUpDown className="h-5 w-5"/>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
              <h2 className="text-red-500 p-2 border rounded-lg">
                  <strong>Rating:</strong> {item.rating || "N/A"}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900 my-3">
                  <strong>Your Answer:</strong> {item.userAns || "N/A"}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900 my-3">
                  <strong>Correct Answer:</strong> {item.correctAns || "N/A"}
                </h2>
                <p className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                  <strong>Feedback:</strong> {item.feedback || "No feedback provided"}
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mt-5">No feedback available yet.</p>
      )}
      </>}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}


export default Feedback;
