import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import React, { useContext, useState } from 'react'

export const searchProvider = React.createContext(null);
export default function App({ Component, pageProps }) {
  const [search  , setSearch] = useState('')

  return (
    <searchProvider.Provider value={{search , setSearch}}>
      <Header/>
        <Component {...pageProps} />
      <Footer/>
    </searchProvider.Provider>

  )
}
