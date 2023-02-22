import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import {UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {

  return (
    <UserProvider>
      <Header/>
        <Component {...pageProps} />
      <Footer/>
    </UserProvider>

  )
}
