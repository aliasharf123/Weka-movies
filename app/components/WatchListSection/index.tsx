'use client'
import React from 'react'
import {auth } from '@/firebase/Clients';
import { Suspense } from 'react'
import NoUser from './noUser';

import WatchList from './watchList';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';

export default  function WatchListSection() {
    const [user , loading] = useAuthState(auth)

    if(loading) return <Loading/>
    if(!user) return <NoUser/> // Mange Auth
    return (
        <Suspense fallback={<Loading/>}>
            <WatchList />
        </Suspense>
    )
}
