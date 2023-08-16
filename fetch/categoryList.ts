import {client} from '@/sanity/lib/client'

export const getAllcategories=async()=>{
    const results=await client.fetch(`*[_type =='category']`,{
      cache: "no-store",
    })
      console.log("results",results)
    return results
  
}