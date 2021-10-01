import React from "react";
import classes from "../styles/Miniplayer.module.css";
import { useRef } from "react";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Miniplayer({ id, title }) {
   const buttonRef = useRef(null);
   const [status, setStatus] = useState(false);
   const videoURL = `https://www.youtube.com/watch?v=${id}`;

   const toggleMiniplayer = () => {
      if (!status) {
         buttonRef.current.classList.remove(classes.floatingBtn);
         setStatus(true);
      } else {
         buttonRef.current.classList.add(classes.floatingBtn);
         setStatus(false);
      }
   };

   return (
      <div
         ref={buttonRef}
         className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      >
         <span
            className={`material-icons-outlined ${classes.open}`}
            onClick={toggleMiniplayer}
         >
            play_circle_filled
         </span>
         <span
            onClick={toggleMiniplayer}
            className={`material-icons-outlined ${classes.close}`}
         >
            close
         </span>
         {status ? (
            <ReactPlayer
               url={videoURL}
               width='300px'
               height='168px'
               playing={status}
               controls
            />
         ) : null}
         <p>{title}</p>
      </div>
   );
}
