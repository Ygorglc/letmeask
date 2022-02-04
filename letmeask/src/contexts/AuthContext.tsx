import React,{ createContext, useState, useEffect, ReactNode } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AutContextType = {
  user: User | undefined;
  signInWithGoogle:() => Promise<void>;
}
type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AutContextType);


export function AuthContextProvider(props: AuthContextProviderProps){

const [user,  setUser] = useState<any>({});

useEffect(()=> {//função para reconectar o usuario casa a pagina seja atualizada ou ele saia da aplicação
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) { 
          const { displayName, photoURL, uid } = user
    
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Acconunt.');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
      }
      return () => { // a criação do return para se descadastrar do event listener
        unsubscribe();
      }
    })
  },[])
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Acconunt.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>

  );
}