import React from "react";
import classes from "../styles/Illustration.module.css";

export default function Illustration({ img, alt }) {
   return (
      <div className={classes.illustration}>
         <img src={img} alt={alt} />
      </div>
   );
}
