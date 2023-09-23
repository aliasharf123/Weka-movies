'use client'
import Image from 'next/image'
import { useState } from 'react';
import MoviesList from '@/components/movies';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRef } from 'react';
import { auth  } from '../../firebase/Clients';
import { useAuthState } from 'react-firebase-hooks/auth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import WatchList from '@/components/watchList';
import { Loader } from '@mantine/core';

export default function Home({data}) {
  // State variables for managing the component's behavior
  const [enabled, setEnabled] = useState('day'); // State for a day/night mode toggle
  const [search, setSearch] = useState(''); // State for storing user input in a search field
  const router = useRouter(); // Next.js router for navigating between pages
  const [user, loading, error] = useAuthState(auth); // State related to user authentication

  // State variables for managing a modal/dialog
  const [open, setOpen] = useState(false); // State for controlling the visibility of a modal/dialog
  const refButton = useRef(null); // Ref to a button element for opening the modal

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/Search/${search}`); // Navigate to a search page with the user's input
  }

  return (
    <main className=" lg:px-40 flex flex-col gap-9 ">
      {/* Background Image Section */}
      <div className="relative">
        {/* Background Image */}
        <Image
          width={100000}
          height={1000000}
          priority
          className="object-cover w-full h-[600px] brightness-50 relative "
          src={`https://www.themoviedb.org/t/p/w1280${data}`}
          alt="main"
        />

        {/* Content Overlay */}
        <div className="absolute z-10 text-slate-100 -top-0 ml-3 lg:m-24 mt-60 lg:mt-72 md:w-9/12 w-[85%] h-36 gap-3 flex flex-col ">
          <div>
            {/* Welcome Message */}
            <h1 className="text-5xl ">Welcome </h1>
            {/* User Greeting */}
            {user && (
              <p className="text-2xl">
                <span className="text-[#F4181C]">
                  {user.email.slice(0, user.email.indexOf("@"))}
                </span>{" "}
                to my first big website
              </p>
            )}
          </div>

          {/* Search Form */}
          <form
            className="bg-white rounded-full w-full h-1/3   "
            onSubmit={handleSubmit}
          >
            <input
              type="text "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full w-[70%] lg:w-[85%]  px-3 focus-within:outline-none text-gray-700"
              placeholder="Search for Movies and TV show "
            />
            <button
              type="submit"
              className="bg-[#F4181C] rounded-full w-[30%] lg:w-[15%] h-[48px] "
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* What to Watch Section */}
      <div className="text-white  flex flex-col ">
        <h1 className="text-header mb-4">What to watch</h1>

        {/* User Authentication Handling */}
        {!loading ? (
          user ? (
            <WatchList />
          ) : (
            <div className="flex flex-col py-10">
              <BookmarkBorderIcon className="text-6xl  bg-[rgba(0,0,0,0.4)] text-white m-auto" />
              <div className="m-auto text-center">
                <p className="font-bold">Sign in to see suggestion</p>
                <p>
                  Save shows and movies to keep track of what you want to watch.
                </p>
                <button
                  onClick={() => router.push("/signin")}
                  className="text-[#F4181C] mt-6 p-2 px-6 rounded-sm font-medium bg-[#121212]"
                >
                  Sign in to weka
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center h-20">
            <Loader color="red" />
          </div>
        )}
      </div>

      {/* Video and Trending Section */}
      <div className="text-white  flex flex-col  gap-6">
        {/* Video Component */}
        <Video />

        <div className="flex flex-row gap-6 ">
          <h1 className="text-header">Trending</h1>

          {/* Day/Week Toggle */}
          <div className="hidden gap-10 border-2 border-[#F4181C] px-2  rounded-full w-44 h-8 relative mt-1 sm:flex">
            <button
              onClick={() => setEnabled("day")}
              className={`z-20 ${!(enabled === "week") && "text-black"}`}
            >
              Today
            </button>
            <div
              className={`absolute  bg-[#F4181C]  w-16 h-8  -left-1 -top-[2px] rounded-full  ${
                enabled === "week"
                  ? "w-[6.3rem] translate-x-[80%]  duration-150 "
                  : "duration-150"
              }`}
            >
              {" "}
            </div>
            <button
              onClick={() => setEnabled("week")}
              className={`z-20    ${enabled === "week" && "text-black"}  `}
            >
              This Week
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="relative sm:hidden   flex ">
            <button
              className={`bg-[#F4181C]  w-32 py-1 ${
                !open ? "rounded-lg" : "rounded-t-lg"
              }  flex justify-between px-3`}
              onClick={() => {
                setOpen(!open);
                if (open) {
                  if (refButton.current.innerHTML === "Today") {
                    setEnabled("day");
                  } else {
                    setEnabled("week");
                  }
                }
              }}
            >
              <h1 ref={refButton}>
                {!(enabled === "day") ? "This Week" : "Today"}
              </h1>
              <ExpandMoreIcon />
            </button>
            {open && (
              <button
                className="absolute top-8 text-white bg-[#F4181C]  w-32 py-1 rounded-b-lg z-50"
                onClick={() => {
                  setOpen(false);
                  if (refButton.current.innerHTML === "Today") {
                    setEnabled("week");
                  } else {
                    setEnabled("day");
                  }
                }}
              >
                <h1>{enabled === "week" ? "Today" : "This Week"}</h1>
              </button>
            )}
          </div>
        </div>

        {/* Movies List Component */}
        <MoviesList
          url={`https://api.themoviedb.org/3/trending/all/${enabled}?`}
        />
      </div>
    </main>
  );
}