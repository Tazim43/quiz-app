import React from "react";
import Checkbox from "./Checkbox";
import classes from "../styles/Answers.module.css";
import { Fragment } from "react";

export default function Answers({ options = [], handleChange, input }) {
   return (
      <>
         <div className={classes.answers}>
            {options.map((option, index) => (
               <Fragment key={index}>
                  {input ? (
                     <Checkbox
                        key={index}
                        className={classes.answer}
                        text={option.title}
                        type='checkbox'
                        value={index}
                        checked={option.checked}
                        onChange={(e) => handleChange(e, index)}
                     />
                  ) : (
                     <Checkbox
                        key={index}
                        className={`${classes.answer} ${
                           option.correct
                              ? classes.correct
                              : option.checked
                              ? classes.wrong
                              : null
                        }`}
                        text={option.title}
                        type='checkbox'
                        defaultChecked={option.checked}
                        disabled
                     />
                  )}
               </Fragment>
            ))}
         </div>
      </>
   );
}
