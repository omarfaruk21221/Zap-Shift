import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import DotLoading from "../../Components/Spinner/DotLoading";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // ----- create user / register --------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // ----- Sign In user / register --------
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //--------- sign in with google ---------
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   ----sign out -----
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  //---- updateUserProfile ----
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //----- observe user state------
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubcribe();
    };
  }, []);
  //   ---- output ---
  if (loading) {
    return <DotLoading />;
  }
  const authInfo = {
    registerUser,
    signInUser,
    googleSignIn,
    signOutUser,
    user,
    setUser,
    loading,
    setLoading,
    updateUserProfile,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
