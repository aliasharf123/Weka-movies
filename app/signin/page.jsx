'use client'
import {auth } from "@/firebase/Clients";
import {  createUserWithEmailAndPassword , signInWithPopup , signInWithEmailAndPassword , GoogleAuthProvider} from "firebase/auth";
import {  useState } from "react";
import {Button} from '@mantine/core'
import {useAuthState} from 'react-firebase-hooks/auth'
import logo from '../../public/static/large-WOMJa9L29-transformed.png'
import Image from "next/image";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/navigation";


function Signin() {
    const [user, loading, error] = useAuthState(auth); // Get the authenticated user
    const [email, setEmail] = useState(''); // State to store email input
    const [password, setPassword] = useState(''); // State to store password input
    const [errorMessage, seterrorMessage] = useState(''); // State to store error messages
    const [toggle, setToggle] = useState(false); // State to toggle between sign-in and sign-up forms
    const router = useRouter();

    // Sign in or sign up with Google
    const SignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        signInWithPopup(auth, provider).catch(error => {
            console.log(error);
        });
        auth.onAuthStateChanged(user => {
            if (user) {
                router.push('/');
            }
        });
    }

    // Display loading message while authenticating
    if (loading) {
        return (<div>Loading..</div>)
    }

    // Display error message if authentication fails
    if (error) {
        return (<div>error...</div>)
    }

    // If the user is already authenticated, show a message
    if (user) {
        return (
            <div className="h-screen text-center text-gray-100 text-6xl">
                <h1>You're already signed in</h1>
            </div>
        )
    }

    // Function to sign in or sign up with email and password
    const SignWithEmail = (e) => {
        e.preventDefault();
        if (email && password) {
            if (toggle) {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    // Signed up successfully
                    router.push('/');
                })
                    .catch((error) => {
                        // Handle sign-up error
                        seterrorMessage(error.message)
                        setTimeout(() => seterrorMessage(''), 3000)
                    });
            } else {
                signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    // Signed in successfully
                    router.push('/');
                })
                    .catch((error) => {
                        // Handle sign-in error
                        seterrorMessage(error.message)
                        setTimeout(() => seterrorMessage(''), 3000)
                    });
            }
        }
    }
    return ( 
    
    <div style={{backgroundImage:  `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(/static/istockphoto-1295114854-2048x2048-transformed.jpeg)` }}
     className=" w-full h-screen flex flex-col justify-center bg-center bg-repeat bg-cover">  
        <div action="" className="flex flex-col  p-10 w-96 bg-[#121212] m-auto drop-shadow-2xl rounded-lg"  >
            <div className="flex flex-col gap-3 mb-10">
                <h1 className="text-white text-center text-3xl">{!toggle ? 'Sign In' : 'Sign up'}</h1>
                <Image alt="logo" src={logo } width={200} className='mx-auto  w-28' height={200} unoptimized/>
            </div> 
            <form className=" flex flex-col gap-5" onSubmit={SignWithEmail}>
                <p className="text-red-500">{errorMessage.slice(9)}</p>
                <input type="email" className="p-2 outline-none rounded-sm" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email'/>
                <input type="password" className="p-2 outline-none rounded-sm"  onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'/>
                <div className="flex  gap-3">
                    <input type="checkbox" name="" id="" />
                    <p className="text-white">Remember me</p>
                    
                </div>
                <Button className='bg-[#F4181C] hover:bg-red-600  h-10  w-full m-auto mt-6  mb-3' type='submit'>Submit</Button>
            </form>
            <div className=" m-auto  w-3/4 flex flex-col gap-3">
                <p className="text-white text-center  text-sm font-light">{!toggle ? 'Dont ' : 'Aleardy'} have an account ? <button className="text-[#F4181C]  hover:text-red-500 font-medium" onClick={() => setToggle(!toggle)}> {toggle ? 'Sign In' : 'Sign up'}!</button></p>
                <button onClick={SignInWithGoogle} className='bg-white rounded-lg w-full p-2'>
                        <GoogleIcon/>
                    
                </button>
            </div>
        </div>
    </div> 
    );
}

export default Signin;