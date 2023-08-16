import {client} from '@/sanity/lib/client'

export const getAllSellers=async()=>{
    const results=await client.fetch(`*[_type =='seller']`)
      console.log("results",results)
    return results
  
}