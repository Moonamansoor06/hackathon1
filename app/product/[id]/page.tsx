"use client"
import React, { useEffect, useState } from 'react';
import Card2 from '../../../components/card2';
import  getProductById  from '../../../fetch/productbyid';


const ProductByIdPage = (params) => {


const {id} =params.params
console.log("id is from productpage params",id)

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        console.log("product by id is from [id]",productData)
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async({cartItem}) => {
    console.log("will add to cart",cartItem)
    await fetch('/api/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItem })
    });
    console.log('Adding product to cart:', cartItem);
  };

  

  if (!product) {
    return <div>Loading...</div>;
  }

  const { Product_name, Image, Price, variants } = product[0];
  console.log("variants is ",Product_name,variants)
  const imageUrl = Image?.asset?._ref || '';

  const imageParts = imageUrl.split('/').pop()?.split('-') || [];
  const imageId = imageParts[1];
  const dimensions = imageParts[2]?.replace('-jpg', '') || '';

  const finalImageUrl = imageId && dimensions
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}-${dimensions}.jpg`
    : '';

  return (
    <div className='w-full h-full'>
      
   
      <Card2
        product={product}
      
        
      />
      </div>
    
  );
};

export default ProductByIdPage;
