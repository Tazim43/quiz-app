import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/Progressbar.module.css";
import Button from "./Button";

export default function Progressbar({
   handleNext,
   result,
   handlePrev,
   progress,
   handleSubmit,
}) {
   const [tooltip, setTooltip] = useState(false);
   const tooltipRef = useRef(null);

   const toggleTooltip = () => {
      if (tooltip) {
         setTooltip(false);
         tooltipRef.current.style.display = "none";
      } else {
         setTooltip(true);
         tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
         tooltipRef.current.style.display = "block";
      }
   };

   return (
      <div className={classes.progressBar}>
         <div className={classes.backButton} onClick={handlePrev}>
            <span className='material-icons-outlined'> arrow_back </span>
         </div>

         <div className={classes.rangeArea}>
            <div className={classes.tooltip} ref={tooltipRef}>
               {progress}% Complete!
            </div>
            <div className={classes.rangeBody}>
               <div
                  className={classes.progress}
                  onMouseOver={toggleTooltip}
                  onMouseOut={toggleTooltip}
                  style={{ width: progress + "%" }}
               ></div>
            </div>
         </div>

         {result ? (
            <Link to='/result'>
               <Button onClick={handleSubmit} className={classes.next}>
                  <span>Submit</span>
                  <span className='material-icons-outlined'>arrow_forward</span>
               </Button>
            </Link>
         ) : (
            <Button onClick={handleNext} className={classes.next}>
               <span>Next Question</span>
               <span className='material-icons-outlined'>arrow_forward</span>
            </Button>
         )}
      </div>
   );
}
