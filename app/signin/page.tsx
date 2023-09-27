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
import BackgroundImage from '../../public/static/istockphoto-1295114854-2048x2048-transformed.jpeg'
import google from '../../public/static/google.png'
import Link from 'next/link'
function Signin() {
    const [user, loading] = useAuthState(auth); // Get the authenticated user
    const [email, setEmail] = useState(''); // State to store email input
    const [password, setPassword] = useState(''); // State to store password input
    const [errorMessage, seterrorMessage] = useState(''); // State to store error messages
    const [toggle, setToggle] = useState(false); // State to toggle between sign-in and sign-up forms
    const router = useRouter();
    const [SignLoading , setLoading] = useState(false)
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
    // If the user is already authenticated, show a message
    if (user) {
        return (
            <div className="h-screen text-center text-gray-100 text-6xl">
                <h1>You're already signed in</h1>
            </div>
        )
    }

    // Function to sign in or sign up with email and password
    const SignWithEmail = (e : any) => {
        e.preventDefault();
        if (email && password) {
            if (toggle) {
                setLoading(true)
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    // Signed up successfully
                    setLoading(false)
                    router.push('/');
                })
                    .catch((error) => {
                        // Handle sign-up error
                        setLoading(false)
                        seterrorMessage(error.message)
                        setTimeout(() => seterrorMessage(''), 3000)
                    });
            } else {
                setLoading(true)
                signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    // Signed in successfully
                    setLoading(false)
                    router.push('/');
                })
                    .catch((error) => {
                        // Handle sign-in error
                        setLoading(false)

                        seterrorMessage(error.message)
                        setTimeout(() => seterrorMessage(''), 3000)
                    });
            }
        }
    }
    return ( 
    
    <div className=" w-full h-screen grid md:grid-cols-2  text-white">  
        <div  className="flex flex-col  gap-14"  >
            <div className="flex items-center p-3  sm:p-5  md:p-10 gap-2 justify-between">
                <Link href={'/'}  className="flex items-center gap-2">
                    <Image alt="logo" src={logo} width={40}  height={40} unoptimized/>
                    <h1>Weka Movies</h1>
                </Link>
                <button onClick={() => setToggle(!toggle)} className="underline">
                    {!toggle ?  'Create an account' : 'Sign in'}
                </button>
            </div>
            <div className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col gap-3  items-center">
                    <h1 className="text-white text-center text-3xl font-medium">{!toggle ? 'Welcome home, Mr. Cobb' : 'Welcome to Earth'}</h1>
                    <h1>Enter your {!toggle ? 'Weka account' : 'Information'} details.</h1>
                </div> 
                <div className="  flex flex-col gap-3 min-w-[300px] w-1/2">
                    <button onClick={SignInWithGoogle} className='bg-white rounded-lg w-full p-2 text-black flex font-bold justify-center items-center gap-2'>
                        <Image src={google} width={20} height={20} alt="google"/>
                        <h1>Log in with Google</h1>
                    </button>
                </div>
                <div  className="" >
                    OR
                </div>
                <form className=" flex flex-col gap-5 min-w-[300px] w-1/2" onSubmit={SignWithEmail}>
                    {errorMessage && <p className="text-red-500">{errorMessage.slice(9)}</p>}
                    <input type="email" className="InputSign" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email'/>
                    <input type="password" className="InputSign"  onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password'/>
                    <div className="flex  gap-3">
                        <input type="checkbox" name="" id="" />
                        <p className="text-white">Remember me</p>
                        
                    </div>
                    <Button className='bg-[#F4181C] hover:bg-red-600  h-10  w-full m-auto mt-6  mb-3' type='submit'>{SignLoading ? 'Loading....' : 'Submit'}</Button>
                </form>
            </div>
        </div>
        <div className="relative max-md:hidden">
            <Image  className="object-cover" alt="BackgroundImafe" src={BackgroundImage} fill/>
        </div>
    </div> 
    );
}

export default Signin;