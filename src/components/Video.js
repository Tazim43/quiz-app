import React from "react";
import classes from "../styles/Video.module.css";
import { Link } from "react-router-dom";

export default function Video({ title, id, noq }) {
   return noq > 0 ? (
      <Link
         to={{
            pathname: `quiz/${id}`,
            state: {
               videoTitle: title,
            },
         }}
      >
         <div className={classes.video}>
            <img
               src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
               alt='{title}'
            />
            <p>{title}</p>
            <div className={classes.qmeta}>
               <p>{noq} Questions</p>
               <p>Total points : {noq * 5}</p>
            </div>
         </div>
      </Link>
   ) : (
      <div className={classes.video}>
         <img
            src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt='{title}'
         />
         <p>{title}</p>
         <div className={classes.qmeta}>
            <p>{noq} Questions</p>
            <p>Total points : {noq * 5}</p>
         </div>
      </div>
   );
}
