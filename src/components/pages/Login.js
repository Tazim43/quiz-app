import React from "react";
import Illustration from "../Illustration";
import loginImg from "../../assets/images/login.svg";
import LoginForm from "../LoginForm";

export default function Login() {
   return (
      <>
         <h1>Login to your account</h1>
         <div className='column'>
            <Illustration img={loginImg} alt='LogIn' />
            <LoginForm />
         </div>
      </>
   );
}
