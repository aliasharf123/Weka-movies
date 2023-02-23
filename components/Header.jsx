import {   useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import Image from 'next/image';
import logo from '../public/static/large-WOMJa9L29-transformed.png'
import logo1 from '../public/static/Profile-PNG-File.jpg'

import Link from 'next/link';
import { useRouter } from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth } from "@/firebase/Clients";
import { Menu, Button ,Burger ,Drawer ,useMantineTheme  } from '@mantine/core';



export default function Header() {
  const [search , setSearch] = useState('');
  const router = useRouter()
  const [user, loading , error] = useAuthState(auth)
  const [opened, setOpen] = useState(false);
  const [opened1, setOpened] = useState(false);

  const title = opened ? 'Close navigation' : 'Open navigation';
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(search){
      setOpen(false)
      setSearch('')
      router.push(`/Search/${search}`)
    }
  }
  if(loading){
    return (<div>Loading..</div>)
  }
  if(error){
      return(<div>error...</div>)
  }
  return (
    <nav className=' flex flex-col justify-center  shadow-lg   relative '>
      <div className='h-16 flex w-full p-2  z-[200] bg-[#121212] m-auto'>
        <div className='flex mx-auto'>
          <Link href='/' passHref><Image className='h-full object-contain p-1 ' src={logo} width={100} height={200} unoptimized alt='logo'/></Link>
          <ul className='text-[rgba(255,255,255,0.8)]  flex gap-8 m-auto max-lg:hidden'>
            <li><Link className='hover:text-[#F4181C] duration-300' href="/" passHref>HOME</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="/Movies" passHref>MOVIE</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="TvShow" passHref>TV SHOW</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="/" passHref>ABOUT</Link></li>
          </ul>
        </div>
        <div className='m-auto gap-4 flex h-full p-1 justify-center '>
          <button className='text-white my-auto'onClick={() => setOpen(!opened)} ><SearchIcon/></button>
          {!user ? <Button className='bg-[#F4181C] hover:bg-red-600 m-auto' ><Link href="/signin">SIGN IN</Link></Button> :
            <Menu >
              <Menu.Target>
                <button><Image alt='avatar' src={user.photoURL ? user.photoURL: logo1} width={200} height={200} className='rounded-full w-full h-full  object-cover' unoptimized/></button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item><Link href='/profile' passHref>Profile</Link> </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={() => auth.signOut()}>Delete my account</Menu.Item>
              </Menu.Dropdown>
            </Menu>
              }
        <Burger
          opened={opened1}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color='white'
          className='lg:hidden my-auto'
        />
        <Drawer
          opened={opened1}
          onClose={() => setOpened(false)}
          padding="lg"
          size="md"
        >
          <ul className='flex flex-col gap-8 m-auto '>
            <li><Link className='hover:text-[#F4181C] duration-300 text-black' href="/" onClick={() => setOpened(false)} passHref>HOME</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="/Movies"  onClick={() => setOpened(false)} passHref>MOVIE</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="TvShow"  onClick={() => setOpened(false)} passHref>TV SHOW</Link></li>
            <li><Link className='hover:text-[#F4181C] duration-300' href="/"  onClick={() => setOpened(false)} passHref>ABOUT</Link></li>
          </ul>
        </Drawer>
        </div>
      </div>
        <div className={`bottom-0 h-14  bg-[#121212] text-white justify-center flex w-full border-t-[0.5px] border-[#F4181C] duration-300 transition-all z-50  absolute ${!opened ? '' : ' translate-y-full'} `}>
            <form onSubmit={handleSubmit} className='bg-[#1F1F1F]  flex w-[70%] px-2'>
               <input value={search} type="text" onChange={(e)=> setSearch(e.target.value)} className='outline-none text-white p-2 w-full bg-[#1F1F1F]' placeholder='i am looking for...'/>
               <Button className='bg-[#F4181C] hover:bg-red-600  m-auto' type='submit'>Search</Button>

            </form>
        </div>
    </nav>
  )
}
