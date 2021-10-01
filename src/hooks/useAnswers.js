import { get, getDatabase, orderByKey, query, ref } from "@firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoId) {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [answers, setAnswers] = useState([]);

   useEffect(() => {
      async function fetchAnswers() {
         const db = getDatabase();
         const answersRef = ref(db, `answers/${videoId}/questions`);
         const answersQuery = query(answersRef, orderByKey());

         try {
            setError("");
            setLoading(true);
            const snapShot = await get(answersQuery);

            if (snapShot.exists()) {
               setAnswers((oldData) => [
                  ...oldData,
                  ...Object.values(snapShot.val()),
               ]);
            }

            setLoading(false);
         } catch (error) {
            setError("There was an error");
            setLoading(false);
         }
      }
      fetchAnswers();
   }, [videoId]);

   return {
      loading,
      error,
      answers,
   };
}
