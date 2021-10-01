import React from "react";
import Form from "./Form";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignupForm() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPawword] = useState();
   const [agree, setAgree] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState();
   const history = useHistory();

   const { signup } = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();
      // password validation
      password === confirmPassword
         ? setError("")
         : setError(`Password doesn't match`);

      password.length < 6
         ? setError("Password must be 6 character or more")
         : setError("");

      try {
         setError("");
         setLoading(true);
         await signup(email, password, username);
         history.push("/");
      } catch (error) {
         setLoading(false);
         setError("Signup failed!");
      }
   };

   return (
      <Form style={{ height: "500px" }} action='#' onSubmit={handleSubmit}>
         <TextInput
            type='text'
            placeholder='Enter name'
            icon='person'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
         />
         <TextInput
            type='email'
            placeholder='Enter email'
            icon='alternate_email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
         />
         <TextInput
            type='password'
            placeholder='Enter password'
            icon='lock'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
         />
         <TextInput
            type='password'
            placeholder='Confirm password'
            icon='lock_clock'
            value={confirmPassword}
            onChange={(e) => setConfirmPawword(e.target.value)}
            required
         />
         <Checkbox
            text='I agree to the Terms &amp; Conditions'
            type='checkbox'
            value={agree}
            onChange={(e) => setAgree(e.target.value)}
            required
         />
         <Button disabled={loading}>
            <span>Submit Now</span>
         </Button>
         {error && <p className='error'>{error} </p>}
         <div className='info'>
            Already have an account?
            <Link to='/login'>Login</Link> instead.
         </div>
      </Form>
   );
}
