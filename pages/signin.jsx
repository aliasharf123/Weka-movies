
import firebase , {auth } from "@/firebase/Clients";
import { useEffect, useState } from "react";

import {useAuthState} from 'react-firebase-hooks/auth'

function Signin() {
   const [user, loading , error] = useAuthState(auth)
    const SignInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        auth.signInWithPopup(provider);
    }
    if(loading){
        return (<div>Loading..</div>)
    }
    if(error){
        return(<div>error...</div>)
    }
    return ( 
    
    <div className="text-white">
        <h1 className="text-center text-5xl">Sign in</h1>
        {user ? <button onClick={() => auth.signOut()}>Sign Out</button>:<button onClick={SignInWithGoogle} className='bg-white text-black'>Sign in with Google</button>}
    </div> );
}

export default Signin;