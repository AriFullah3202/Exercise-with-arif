import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';



export const AuthContext = createContext();

const UserContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)

    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);

    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // for login 
    const logIn = (email, password) => {
        console.log(email, password)
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }


    // to fetch current user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside auth state change', currentUser);

            if (currentUser) {
                setUser(currentUser);
            }
            else {
                setUser(currentUser)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }

    }, [])
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authInfo = { createUser, logIn, logOut, providerLogin, updateProfile, setLoading, user, loading, updateUserProfile };

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default UserContext
