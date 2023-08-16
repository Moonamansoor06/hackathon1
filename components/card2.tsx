"use client"
import React, { useState,useEffect } from 'react';
import { CartItem, newCartItem } from '@/lib/drizzle'
// import { useAuth } from "@clerk/nextjs";
 import { useUser } from "@clerk/nextjs";


const Card2 = ({ product, }) => {
 // const { isLoaded, userId, } = useAuth();
   const user=useUser()
     console.log("user is ",user.user.emailAddresses[0].emailAddress)
 const email=user?.user.emailAddresses[0].emailAddress as string
  const userId=user.user.id
  const [selectedVariant, setSelectedVariant] = useState({size:'',color:'',qty:'',image:{asset:{_ref:''}}});
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantImageUrl, setSelectedVariantImageUrl] = useState('');
  const { Product_ID,Product_name, Image, Price, variants,Description } = product[0];
  console.log("product" ,Price,Product_name,variants,Product_ID)
  useEffect(() => {
    setSelectedVariant(variants[0])
    const imageUrl = variants[0]?.image?.asset?._ref || '';
    const imageParts = imageUrl.split('/').pop()?.split('-') || [];
    const imageId = imageParts[1];
    const dimensions = imageParts[2]?.replace('-jpg', '') || '';
  
    const variantImageUrl = imageId && dimensions
      ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}-${dimensions}.jpg`
      : '';
  
    setSelectedVariantImageUrl(variantImageUrl);
  }, [])
  
  const handleAddToCart = async () => {
   
    try {
      const { size, color, qty } = selectedVariant;
      let quantity= parseInt(qty)
      console.log("selected variant ",color,size,qty)
      const cartItem = {
        productId: Product_ID,
        quantity:1,
        price: Price,
        size: size,
        color: color,
      };
      const reqBody = {cartitem:cartItem,userid:userId,useremail:email}
    //  console.log("userid and email is",userId,email)
     console.log("cartItem is ",cartItem)
      await fetch('/api/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {reqBody} ), 
        // Include userId and email in the request body
      });
  
      console.log('Adding product to cart:', cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  
  const handleVariantClick = (variant) => {

    setSelectedVariant(variant);
  
    const imageUrl = variant?.image?.asset?._ref || '';
    const imageParts = imageUrl.split('/').pop()?.split('-') || [];
    const imageId = imageParts[1];
    const dimensions = imageParts[2]?.replace('-jpg', '') || '';
  
    const variantImageUrl = imageId && dimensions
      ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}-${dimensions}.jpg`
      : '';
  
    setSelectedVariantImageUrl(variantImageUrl);
  };
  

  // const { Product_name, Image, Price, variants,Description } = product[0];

  const imageUrl = Image?.asset?._ref || '';
  const imageParts = imageUrl.split('/').pop()?.split('-') || [];
  const imageId = imageParts[1];
  const dimensions = imageParts[2]?.replace('-jpg', '') || '';

  const initialFinalImageUrl = imageId && dimensions
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}-${dimensions}.jpg`
    : '';

  const finalImageUrl = selectedVariant?.image?.asset?._ref || initialFinalImageUrl;

  return (
    <div className="bg-white mr-4 ml-4 mt-8 p-4 shadow rounded flex flex-col md:flex-row lg:flex-row justify-between items-stretch">
      
                            <div className="mb-4 w-200 h-200 md:w-auto md:h-auto">
                              {finalImageUrl && (
                                <img
                                src={selectedVariantImageUrl || finalImageUrl}
                                  alt={Product_name}
                               
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                />
                              )}
                            </div>
      <div className='w-[50%] flex flex-col justify-around'>
      <h3 className="text-2xl font-bold mb-2 font-head1Main">{Product_name}</h3>
            <p className="text-gray-600 mb-2">Detail: {Description}</p>
              <p className="text-gray-600 mb-2">Price: {Price}</p>
              <div>
                {variants && (
                  <ul>
                    {variants.map((variant, index) => (
                      <li key={index}>
                        <button onClick={() => handleVariantClick(variant)}>
                          Size: {variant.size}  Color: {variant.color}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
                <div>
                  <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2">
                    Add to Cart
                  </button>
                </div>
        </div>
        
    </div>
    
  );
};

export default Card2;

