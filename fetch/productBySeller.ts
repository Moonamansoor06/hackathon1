import { client } from '@/sanity/lib/client';

export const getAllProductsBySeller = async (params) => {
  const sellerId = params.sellerId.sellerId[1];
  const query = `*[_type == 'product' && Seller_ID == ${sellerId}]`;
    console.log("seller id in fetch is ",sellerId)
 
  
  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
