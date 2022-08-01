import React from 'react'
import { auth, db } from "../firebase";
import {createContext, useContext, useState, useEffect} from 'react'
import {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged
} from 'firebase/auth'

import {doc, setDoc} from 'firebase/firestore'

const UserContext = createContext({});

interface IProps {
      children: any,
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
      const [user, setUser] = useState({});

      const signUp = (email: string, password: string) => {
            createUserWithEmailAndPassword(auth, email, password);
            setDoc(doc(db, 'users', email), {
                  watchList: [],
            })
      }

      const signIn = (email: string, password: string) => {
            return signInWithEmailAndPassword(auth, email, password)
      }

      const logOut = () => {
            return signOut(auth);
      }

      useEffect(() => {
            const unsub = onAuthStateChanged(auth, (currentUser: any) => {
                  setUser(currentUser)
            });

            return () => unsub();
      }, [])

      return (
            <UserContext.Provider value={{signUp, signIn, logOut, user}}>
                  {children}
            </UserContext.Provider>
      )
}

export const UserAuth = () => {
      return useContext(UserContext)
}
