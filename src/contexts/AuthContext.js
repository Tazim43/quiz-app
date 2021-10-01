import React, { useContext, useEffect, useState } from "react";
import "../firebase";
import {
   getAuth,
   onAuthStateChanged,
   signOut,
   createUserWithEmailAndPassword,
   updateProfile,
   signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = React.createContext();

// provider context
export function AuthProvider({ children }) {
   const [loading, setLoading] = useState(false);
   const [currentUser, setCurrentUser] = useState();

   useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setCurrentUser(user);
         setLoading(false);
      });
      return unsubscribe;
   }, []);

   // signup function
   const signup = async (email, password, username) => {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await updateProfile(auth.currentUser, {
         displayName: username,
      });

      const user = auth.currentUser;
      setCurrentUser({
         ...user,
      });
   };
   // Log in function
   const login = (email, password) => {
      const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password);
   };
   // logout function
   const logout = () => {
      const auth = getAuth();
      return signOut(auth);
   };
   const value = {
      currentUser,
      signup,
      login,
      logout,
   };
   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
}
// custom hook for this context
export function useAuth() {
   return useContext(AuthContext);
}
