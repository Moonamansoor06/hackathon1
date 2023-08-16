import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from "@clerk/nextjs";
import { CartItem, newCartItem } from '@/lib/drizzle'
interface CardProps {
  product: {
    Product_ID: number;
    Product_name: string;
    Price: number;
  qty:number;
    Image:{asset:{_ref:string}};
    variants:[{size:string;color:string,qty:number}]
  };

  onProductDetails: (productId: number) => void; 

}

const Card: React.FC<CardProps> = ({ product, onProductDetails }) => {

 
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  console.log("product in card params is ",product);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const handleProductDetails = () => {
    console.log("product id from card is", product.Product_ID);
    onProductDetails(product.Product_ID);
  };

  const { Product_name, Image, Price, variants } = product;
  console.log("product from card element is", variants);

  const imageUrl = Image?.asset?._ref || '';

  const imageParts = imageUrl.split('/').pop()?.split('-') || [];
  const imageId = imageParts[1];
  const dimensions = imageParts[2]?.replace('-jpg', '') || '';

  const finalImageUrl = imageId && dimensions
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}-${dimensions}.jpg`
    : '';

  return (
    <div
      className={`bg-white p-4 shadow rounded flex flex-col justify-evenly
      transition-transform ${isHovered ? 'transform scale-105' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <div className="mb-4 w-36 h-48">
  
        {finalImageUrl && (
          <img
            src={finalImageUrl}
            alt={Product_name}
          
          />
        )}
      </div>
      <div className='my-4'>
        <h1 className="text-2xl font-bold mb-2">{Product_name}</h1>
        <p className="text-gray-600 mb-2">Price: {Price}</p>
        {isHovered && (
          <div>
            <ul>
              {variants.map((variant, index) => (
                <li key={index}>
                  Size: {variant.size}, Color: {variant.color}
                </li>
              ))}
            </ul>
            <div>
              <button onClick={handleProductDetails} className="bg-blue-500 text-white px-4 py-2 mr-2">
                Product Details
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
