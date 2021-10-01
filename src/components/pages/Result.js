import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";
import _ from "lodash";

export default function Result() {
   const { id } = useParams();
   const { location } = useHistory();
   const { state } = location;
   const { qna } = state;

   const { loading, error, answers } = useAnswers(id);

   // score calculation
   const calculate = () => {
      let score = 0;
      answers.forEach((question, index1) => {
         let correctIndexs = [],
            checkedIndexs = [];
         question.options.forEach((option, index2) => {
            if (option.correct) correctIndexs.push(index2);
            if (qna[index1].options[index2].checked) {
               checkedIndexs.push(index2);
               option.checked = true;
            }
         });
         if (_.isEqual(correctIndexs, checkedIndexs)) {
            score += 5;
         }
      });

      return score;
   };

   const userScore = calculate();

   return (
      <>
         {loading && <div>Loadin...</div>}
         {error && <div>There was an error!</div>}
         {!loading && !error && answers && answers.length > 0 && (
            <>
               <Summary userScore={userScore} noq={answers.length} />
               <Analysis answers={answers} />
            </>
         )}
      </>
   );
}
