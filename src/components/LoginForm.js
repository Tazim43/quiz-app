import React from "react";
import Form from "./Form";
import TextInput from "./TextInput";
import Button from "./Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState();
   const { login } = useAuth();
   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         setError("");
         setLoading(true);
         await login(email, password);
         history.push("/");
      } catch (error) {
         setLoading(false);
         setError("LogIn failed!");
      }
   };
   return (
      <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
         <TextInput
            type='email'
            placeholder='Enter email'
            icon='alternate_email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <TextInput
            type='password'
            placeholder='Enter password'
            icon='lock'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <Button disabled={loading}>
            <span>Log In</span>
         </Button>
         {error && <p className='error'>{error} </p>}
         <div className='info'>
            Don't have an account?
            <Link to='signup'>Signup</Link> instead.
         </div>
      </Form>
   );
}
