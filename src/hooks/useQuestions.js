import { get, getDatabase, orderByKey, query, ref } from "@firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoId) {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [questions, setQuestions] = useState([]);

   useEffect(() => {
      async function fetchQuestions() {
         const db = getDatabase();
         const questionsRef = ref(db, `quiz/${videoId}/questions`);
         const questionQuery = query(questionsRef, orderByKey());

         try {
            setLoading(true);
            setError(false);
            const snapShot = await get(questionQuery);
            if (snapShot.exists) {
               setQuestions((oldData) => [
                  ...oldData,
                  ...Object.values(snapShot.val()),
               ]);
            }
            setLoading(false);
         } catch (error) {
            setLoading(false);
            setError("There was an error");
         }
      }

      fetchQuestions();
   }, [videoId]);

   return {
      loading,
      error,
      questions,
   };
}
