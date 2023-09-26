import React from 'react'
import Logo from '../public/static/large-WOMJa9L29-transformed.png'
import Image from 'next/image'

const movieQuotes = [
  "Here's looking at you, kid. - Casablanca",
  "May the Force be with you. - Star Wars",
  "You can't handle the truth! - A Few Good Men",
  "Keep your friends close, but your enemies closer. - The Godfather",
  "I'll be back. - The Terminator",
  "There's no place like home. - The Wizard of Oz",
  "Life is like a box of chocolates; you never know what you're gonna get. - Forrest Gump",
  "You talking to me? - Taxi Driver",
  "You can't change the past, but you can change the future. - The Butterfly Effect",
  "To infinity and beyond! - Toy Story",
  "Why so serious? - The Dark Knight",
  "ET phone home. - E.T. the Extra-Terrestrial",
  "Go ahead, make my day. - Sudden Impact",
  "Houston, we have a problem. - Apollo 13",
  "I feel the need... the need for speed. - Top Gun",
  "I'm the king of the world! - Titanic",
  "Hasta la vista, baby. - Terminator 2: Judgment Day",
  "There's no place like home. - The Wizard of Oz",
  "My precious. - The Lord of the Rings: The Two Towers",
  "Here's Johnny! - The Shining",
  "I coulda been a contender. - On the Waterfront",
  "You can't handle the truth! - A Few Good Men",
  "I'm king of the world! - Titanic",
  "I am Groot. - Guardians of the Galaxy",
  "This is Sparta! - 300",
  "I see dead people. - The Sixth Sense",
  "Just keep swimming. - Finding Nemo",
  "I'm flying, Jack! - Titanic",
  "Here's looking at you, kid. - Casablanca",
  "I'm Batman. - Batman Begins",
  "You shall not pass! - The Lord of the Rings: The Fellowship of the Ring",
  "I could tell you, but then I'd have to kill you. - Top Gun",
  "A martini. Shaken, not stirred. - Goldfinger",
  "I'll be back. - The Terminator",
  "You talking to me? - Taxi Driver",
  "You had me at 'hello.' - Jerry Maguire",
  "I love the smell of napalm in the morning. - Apocalypse Now",
  "I'll have what she's having. - When Harry Met Sally...",
  "You can't change the past, but you can change the future. - The Butterfly Effect",
  "To infinity and beyond! - Toy Story",
];

function getRandomMovieQuote() {
  const randomIndex = Math.floor(Math.random() * movieQuotes.length);
  return movieQuotes[randomIndex];
}


export default function MovieLoading() {
  return (
    <div className='flex flex-col gap-4 h-screen w-full justify-center items-center text-white'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <Image src={Logo}  width={100} height={100} alt='logo'/>
        <h1>Loading.....</h1>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center text-center'>
        <h1>Quote of Day: </h1>
        <h1 className='font-sans text-SecondaryText italic'>{getRandomMovieQuote()}</h1>
      </div>
    </div>
  )
}
