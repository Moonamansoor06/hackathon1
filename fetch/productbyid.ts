import { client } from "@/sanity/lib/client";
const getProductById = async (productId) => {
    try {
   const pId=productId
    const results=await client.fetch(`*[_type =='product' && Product_ID==${pId}]`,{
      cache: "no-store",
    })
      console.log("results",results)
    return results
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };
  
  export default getProductById;
  