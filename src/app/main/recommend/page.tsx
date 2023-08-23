"use client"
import AreaSelector from '@/src/components/AreaSelector'
import Bottombar from '@/src/components/Bottombar'
import ShopThumbList from '@/src/components/ShopThumbList'

const Recommend = () => {
  return (
    <div className='recommend_container w-full flex flex-col justify-center items-center max-w-6xl mx-auto px-1 bg-orange-500'>
      <AreaSelector />
      <ShopThumbList />
      <Bottombar />
    </div>
  )
}

export default Recommend