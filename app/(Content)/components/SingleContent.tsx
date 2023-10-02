import { ContentItem } from '@/types/ContentType'
import React from 'react'
import ContentBanner from './ContentBanner'
import TopCast from './TopCast'
import Reviews from './Reviews/Reviews'
import Photos from './Photos'
import Recommendation from './Recommendation'
import Model from '@/components/TrailerModel'

export default function SingleContent({Cotent , trailerId} : {Cotent : ContentItem , trailerId :string }) {
  return (
    <div className="flex flex-col gap-8">
    <ContentBanner Content={Cotent as any} />
    <TopCast Content={Cotent} />
    <Reviews Content={Cotent} />
    <Photos Content={Cotent} />
    <Recommendation Content={Cotent} />
    {trailerId && <Model />}
  </div>
  )
}
