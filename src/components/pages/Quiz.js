import React, { useEffect, useReducer, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import Miniplayer from "../Miniplayer";
import Progressbar from "../Progressbar";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "@firebase/database";

const initialState = null;

const reducer = (state, action) => {
   switch (action.type) {
      case "questions":
         action.value.forEach((question) => {
            question.options.forEach((option) => {
               option.checked = false;
            });
         });
         return action.value;

      case "answers":
         const questions = _.cloneDeep(state);
         questions[action.questionID].options[action.optionsIndex].checked =
            action.value;

         return questions;

      default:
         return state;
   }
};

export default function Quiz() {
   const { id } = useParams();
   const [currentQuiz, setCurrentQuiz] = useState(0);
   const { loading, error, questions } = useQuestions(id);
   const [qna, dispatch] = useReducer(reducer, initialState);

   const { currentUser } = useAuth();
   const history = useHistory();

   const { location } = history;
   const { state } = location;
   const { videoTitle } = state;

   useEffect(() => {
      dispatch({
         type: "questions",
         value: questions,
      });
   }, [questions]);

   // handle checkbox answer
   const handleAnswerChange = (e, indexId) => {
      dispatch({
         type: "answers",
         questionID: currentQuiz,
         optionsIndex: indexId,
         value: e.target.checked,
      });
   };

   // handle next question
   const handleNextQuestion = () => {
      if (currentQuiz <= questions.length) {
         setCurrentQuiz((oldData) => oldData + 1);
      }
   };
   // handle prev question
   const handlePrevQuestion = () => {
      if (currentQuiz > 0) {
         setCurrentQuiz((oldData) => oldData - 1);
      }
   };
   const percentage =
      questions.length > 0 ? ((currentQuiz + 1) * 100) / questions.length : 0;

   // handle submit
   const handleSubmit = async () => {
      const { uid } = currentUser;
      const db = getDatabase();
      const resultRef = ref(db, `result/${uid}`);

      await set(resultRef, {
         [id]: qna,
      });
      history.push({
         pathname: `result/${id}`,
         state: {
            qna,
         },
      });
   };
   return (
      <>
         {loading && <div>Loading...</div>}
         {error && <div>There was an error</div>}
         {!loading && !error && qna && qna.length > 0 && (
            <>
               <h1>{qna[currentQuiz].title}</h1>
               <h4>Question can have multiple answers</h4>
               <Answers
                  options={qna[currentQuiz].options}
                  handleChange={handleAnswerChange}
                  input={true}
               />

               <Progressbar
                  handleNext={handleNextQuestion}
                  handlePrev={handlePrevQuestion}
                  result={currentQuiz + 1 === questions.length ? true : false}
                  progress={percentage}
                  handleSubmit={handleSubmit}
               />
               <Miniplayer id={id} title={videoTitle} />
            </>
         )}
      </>
   );
}
