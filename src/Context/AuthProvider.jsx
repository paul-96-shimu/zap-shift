import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { PiPassword } from 'react-icons/pi';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';





const  googleprovider =new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)
    const createUser = (emial, Password) => {
        return createUserWithEmailAndPassword(auth, emial, Password)
    }



    const SignIn = (emial, Password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, emial, Password)
    }


    const logOut = () => {
            setLoading(true);
        return signOut(auth)
    }

const signInWithGoogle =()=>{
         setLoading(true);
        return signInWithPopup(auth,  googleprovider)

}



    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('user in register', currentUser)
            setLoading(false);
        })
        return () => {
            unSubscribe()
        }

    }, [])
    const authoinfo = {
        createUser,
        SignIn,
        user,
        loading,
        logOut,
         signInWithGoogle

    }
    return (
        <AuthContext value={authoinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;