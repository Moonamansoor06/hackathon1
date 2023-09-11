"use client"
import React, { useState,useEffect } from 'react';
 import { useUser } from "@clerk/nextjs";
 import { urlForImage} from '../sanity/lib/image';
 import Image  from 'next/image';
 import { useRouter } from 'next/navigation';


const Card2 = ({ product, }) => {
 // const { isLoaded, userId, } = useAuth();
 const router=useRouter()
   const user=useUser()
     console.log("user is ",user.user.emailAddresses[0].emailAddress)
 const email=user?.user.emailAddresses[0].emailAddress as string
  const userId=user.user.id
  const [selectedVariant, setSelectedVariant] = useState({size:'',color:'',qty:'',Pimage:{}});
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantImageUrl, setSelectedVariantImageUrl] = useState('');
  const { Product_ID,Product_name, PImage, Price, variants,Description } = product[0];

  console.log("product" ,Price,Product_name,variants,Product_ID)


  useEffect(() => {
    setSelectedVariant(variants[0])
       // console.log("seleteted image of f variants from use effect is",urlForImage(selectedVariant.PImage).url())
    const variantImageUrl=urlForImage(variants[0].Pimage).url()
    setSelectedVariantImageUrl(variantImageUrl);
  }, [])


  const citemid=userId.substring(0,6)

  const handleAddToCart = async () => {
   
    try {
      const { size, color, qty } = selectedVariant;
     // let quantity= 1
      console.log("selected variant ",color,size,qty)
      const cartItem = {
        cartitemid:citemid,
        Buyerid:userId,
        productId: Product_ID,
        Productname:Product_name,
        quantity:1,
        price: Price,
        size: size,
        color: color,
      };
      const reqBody = {cartitem:cartItem,userid:userId,email:email}
    //  console.log("userid and email is",userId,email)
     console.log("cartItem is ",cartItem,"req body is",reqBody)
      await fetch('/api/cart/', {
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
   // router.push(`/cart/${userId}`)
  };
  
  
  const handleVariantClick = (variant) => {

    setSelectedVariant(variant);
  
  const variantImageUrl=urlForImage(variant.Pimage).url()
    setSelectedVariantImageUrl(variantImageUrl);
  };
  // const img=urlForImage(PImage).url()
  // console.log("img i s ",img)

  return (
    <div className="bg-white mr-4 ml-4 mt-8 p-4 shadow rounded flex flex-col md:flex-row lg:flex-row justify-evenly items-stretch">
      
                            <div className="mb-4 w-200 h-200 md:w-auto md:h-auto">
                              
                                <Image  src={selectedVariantImageUrl}
                                alt={selectedVariantImageUrl}
                                width={200}
                                height={300}                                     
                                />
                          
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
                  {/* <CartButton res={cartItem}/> */}
                </div>
        </div>
        
    </div>
    
  );
};

export default Card2;

