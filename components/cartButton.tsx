"use client"
import { Cart,CartType } from "../lib/drizzle";
import Link from "next/link";
import React, { useEffect,useState, } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";

export default async function CartButton(props:{userid:string}) {
  const userId=props.userid
  const [cartData,setCArtData]=useState<CartType[]>([{cartid: 0, cartitemid: '', buyerid: '', email: '', productId: 0, productname: '', quantity: 0, price: 0}])
  //const [userId,setUserId]=useState<string>('')
  useEffect(() => {
    const cartDetails=async()=>{
    try {
     
     const res= await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    
      });
  
      console.log(res);
      const result:CartType[]=await res.json()
      setCArtData(result)
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  
    }
    cartDetails()
  }, []);
  const handleClick = async () => {
   

  };
 
//     const user=useUser()
//  if(user)
//  setUserId(user?.user.id)
    let qArray = cartData
      .filter((items) => items.buyerid ===userId )
      .map((items) => items.quantity);
  
    let qSum = 0;
  
    for (let i = 0; i < qArray.length; i++) {
      qSum += qArray[i];
    }
    return (
      <div>
        <button onClick={handleClick}>
          <div className="relative w-11 h-11 rounded-full bg-gray-200 justify-center items-center hidden lg:flex">
            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-xs text-center place-items-center text-white hover:scale-105">
              {qSum}
            </div>
            <FiShoppingCart size={20} className="hover:scale-105" />
          </div>
        </button>
      </div>
    );
  }