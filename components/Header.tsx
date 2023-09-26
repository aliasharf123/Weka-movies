// Import necessary modules and components
'use client';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import logo from '../public/static/large-WOMJa9L29-transformed.png';
import logo1 from '../public/static/Profile-PNG-File.jpg';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/Clients";
import { Menu, Button, Burger, Drawer, Loader, MantineProvider } from '@mantine/core';


// Array of Navigation 
const Links = ['' , 'Movies' , 'Tv shows' , 'People']

// Define the Header component
export default function Header() {
  // State variables for search input and navigation drawer
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [opened, setOpen] = useState(false);
  const [opened1, setOpened] = useState(false);
  const pathName = usePathname()
  // Set title for the navigation drawer
  const title = opened ? 'Close navigation' : 'Open navigation';

  // Function to handle form submission
  const handleSubmit = (e : any) => {
    e.preventDefault();
    if (search) {
      setOpen(false);
      setSearch('');
      router.push(`/Search/${search}`);
    }
  }
  return (
    <nav className={`flex flex-col justify-center shadow-lg relative ${pathName.endsWith('signin') && 'hidden'}`}>
      {/* Header content */}
      <div className='h-16 flex w-full p-2 z-[200] bg-HeaderColor m-auto'>
        <div className='flex mx-auto'>
          {/* Logo */}
          <Link href='/' passHref>
            <Image className='h-full object-contain p-1' src={logo} width={100} height={200} unoptimized alt='logo' />
          </Link>
          {/* Navigation links */}
          <ul className='text-[rgba(255,255,255,0.8)] flex gap-8 m-auto max-lg:hidden'>
            {Links.map((link , index) => (
              <li key={index}><Link className={`hover:text-[#F4181C] ${pathName.endsWith(link.length ? link : '/') && 'text-[#F4181C]'}  duration-300 `}  href={`/${link}`}>{link.length ? link : 'Home'}</Link></li>
            ))}
          </ul>
        </div>
        <div className='m-auto gap-4 flex h-full p-1 justify-center'>
          {/* Search button */}
          <button className='text-white my-auto' onClick={() => setOpen(!opened)}><SearchIcon /></button>
          {/* User authentication */}
          {!loading ? !user ?
            <Button className='bg-[#F4181C] hover:bg-red-600 m-auto'><Link href="/signin">SIGN IN</Link></Button> :
            <Menu>
              <Menu.Target>
                <button><Image alt='avatar' src={user.photoURL ? user.photoURL : logo1} width={200} height={200} className='rounded-full w-full h-full object-cover' unoptimized /></button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item color="red" onClick={() => auth.signOut()}>Sign out</Menu.Item>
              </Menu.Dropdown>
            </Menu> :
            <Loader color='red' size='md' className="w-full" />
          }
          {/* Mobile navigation burger icon */}
          <Burger
            opened={opened1}
            onClick={() => setOpened((o) => !o)}
            title={title}
            color='white'
            className='lg:hidden my-auto'
          />
          {/* Mobile dark navigation drawer */} 
          <MantineProvider theme={{ colorScheme: "dark" }}> 
            <Drawer
              opened={opened1}
              onClose={() => setOpened(false)}
              padding="lg"
              size="md"
            >
              <ul className='flex flex-col gap-8 m-auto'>
                {Links.map((link , index) => (
                  <li key={index}><Link className={`hover:text-[#F4181C] ${pathName.endsWith(link.length ? link : '/') && 'text-[#F4181C]'}  duration-300 `} onClick={() => setOpened(false)} passHref href={`/${link}`}>{link.length ? link : 'Home'}</Link></li>
                ))}
              </ul>
            </Drawer>
          </MantineProvider>
        </div>
      </div>
      {/* Search input field */}
      <div className={`bottom-0 h-14 bg-[#121212] text-white justify-center flex w-full border-t-[0.5px] border-[#F4181C] duration-300 transition-all z-50 absolute ${!opened ? '' : 'translate-y-full'}`}>
        <form onSubmit={handleSubmit} className='bg-[#1F1F1F] flex w-[70%] px-2'>
          <input value={search} type="text" onChange={(e) => setSearch(e.target.value)} className='outline-none text-white p-2 w-full bg-[#1F1F1F]' placeholder='i am looking for...' />
          <Button className='bg-[#F4181C] hover:bg-red-600 m-auto' type='submit'>Search</Button>
        </form>
      </div>
    </nav>
  )
}
