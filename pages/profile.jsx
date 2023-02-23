import { auth , users } from "@/firebase/Clients";
import logo1 from '../public/static/Profile-PNG-File.jpg'
import { useAuthState  } from "react-firebase-hooks/auth";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Image from "next/image";



function Profile() {
    const [user , loading ,error] = useAuthState(auth)
    const query = users.orderBy('name').limit(3)
    const [Users] = useCollectionData(query , {})

    // console.log(Users)
    if(loading){
        return (<div>Loading..</div>)
    }
    if(error){
        return(<div>error...</div>)
    }
    return (
         <div className="text-[rgba(255,255,255,0.8)] flex mt-10">
            <div className=" gap-4 flex flex-col   w-fit  bg-[#121212] mx-10 p-6 rounded">     
                 <Image src={user.photoURL ? user.photoURL: logo1} alt='profile' width={200} height={200} className='rounded-full w-28  object-cover m-auto' unoptimized/>
                 <div className="flex flex-col p-3 gap-3">
                    <h1 className="px-3 hover:hover:text-[#F4181C] duration-300 ">{user.email.slice(0,user.email.indexOf('@'))}</h1>
                    <button className="hover:hover:text-[#F4181C] duration-300">Watch List</button>
                 </div>
            </div>
            <div>
                ssssssssssss
            </div>
         </div> 
    );
}

export default Profile;