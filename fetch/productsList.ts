import {client} from '@/sanity/lib/client'

export const getAllProducts=async()=>{
    const results=await client.fetch(`*[_type =='product']`,{
      cache: "no-store",
    })
      console.log("results")
    return results
  
}