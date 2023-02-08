import Image from 'next/image';
import logo from '../public/static/large-WOMJa9L29-transformed.png'



function Footer() {
    return (
        <div className="bg-[#121212] text-white ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  h-60 pt-7">
                <Image src={logo} width={100} height={100} className=' ' alt='logo'/>
                <p className='w-48'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id eos quaerat.</p>
            </div>  

        </div>
    );
}

export default Footer;