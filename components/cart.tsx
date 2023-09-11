"use client";
import { Cart,newCart } from "../lib/drizzle";
import React, { useEffect,useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { TiTrash } from "react-icons/ti";
import getStripePromise from "../lib/stripe";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useAuth} from "@clerk/nextjs";
const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "";

 //const {userId}=useAuth()
export async function getData(userId:string) {
 
  console.log("entered get data")
  try {
    const res = await fetch(`${BASE_URL}/api/cart/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    //console.log(res.json())
    return res.json();
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}

export default function CartPage() {
  const [res , setRes]=useState<newCart[]>([])
  const {userId}=useAuth()
  const resFilter = res.filter((items) => items.buyerid === userId);
  const router = useRouter();
  
console.log("res from get data is",res)

useEffect(() => {
  const getCartData=async()=>{
    const res: newCart[] = await getData(userId);
    setRes(res)
  }

getCartData()
}, [])


  const handleDelete = async () => {
    try {
      if (res[0].buyerid) {
        const response = await fetch(`/api/cart/${res[0].buyerid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          router.refresh();
        } else {
          console.log("Delete request failed with status:", response.status);
        }
      }
    } catch (error) {
      console.log("An error occurred during the delete request:", error);
    }
  };
  const handleToast = () => {
        toast.error("Successfully Deleted!");
      };
 async function handleCheckout  () {
    console.log(" inside checkout")
        const stripe = await getStripePromise();
        console.log("stripe is ",stripe)
        const response = await fetch(`/api/checkout_session/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify(resFilter),
        });
    
        const data = await response.json();
        console.log("session from stripe i s",data)
        if (data.session) {
          stripe?.redirectToCheckout({ sessionId: data.session.id });
        }
      };
  
  let PQ = res
    .filter((items) => items.buyerid === res[0].buyerid)
    .map((items) => (Number(items.price)) * Number(items.quantity));

  let subTotalofPQ = 0;

  for (let i = 0; i < PQ.length; i++) {
    subTotalofPQ += PQ[i];
  }

  // items in cart
  let qArray = res
    .filter((items) => items.buyerid === res[0].buyerid)
    .map((items) => Number(items.quantity));

  let qSum = 0;

  for (let i = 0; i < qArray.length; i++) {
    qSum += qArray[i];
  }
   return (
    <div>
      {!res.filter((items) => items.buyerid ===userId ).length && (
        <div className="text-3xl text-slate-400 font-bold text-center pt-10 h-auto">
          No Items Available
        </div>
      )}

      {res.filter((items) => items.buyerid === userId).length > 0 && (
        <>
          <div>
            <h1 className="text-xl font-extrabold mt-12 mb-6 mx-2 p-2">
              Shopping Cart
            </h1>
          </div>
          <div className="">
          
            <div className="">
              {res
                .filter((items) => items.buyerid ===userId)
                .map((mapitems, i) => (
                  <div key={i} className="">
                   <div className="">
                      <div className="">
                        <div>
                              <div className="">
                                {mapitems.productId}
                              </div>                          
                            <div className="">
                              {mapitems.productname}
                            </div>
                            <div className="">
                              $ {mapitems.price * mapitems.quantity}
                            </div>
                          </div> 
                        </div>
                        <div
                          className="hover:scale-105 cursor-pointer"
                          onClick={() => {
                            handleDelete(), handleToast();
                          }}
                        >
                          <TiTrash size={25} />
                        </div>
                      </div>

                      <div className="">
                        <div className="">
                          Delivery Estimation
                        </div>
                        <div className="">
                          5 - 10 Working Days
                        </div>
                      </div>
                      {/* price and quantity div */}
                      <div className="">
                        <div className="">
                          <div>Qty: {mapitems.quantity}</div>{" "}
                          <div> Size: {mapitems.price}</div>
                        </div>
                      </div>
                      {/* price and quantity div ends */}
                    </div>
                  // </div>
                ))}
            </div>
            {/* order summary div */}
            <div className="flex md:items-end">
              <div className="bg-gray-300 rounded-lg md:mt-0 mt-3 flex md:justify-center mx-2 h-fit w-full">
                <div className="p-2 w-[100%] max-w-full md:w-64 h-[12.5rem] flex flex-col justify-between">
                  <div>
                    <h2 className="md:text-xl font-bold">Order Summary</h2>
                  </div>
                  <div className="flex justify-between border-b">
                    <p className="test-sm md:text-md">Items in Cart:</p>
                    <p className="text-red-600 font-bold">{qSum}</p>
                  </div>
                  <div className="test-sm md:text-md flex justify-between border-b">
                    <p className="test-sm md:text-md">Sub Total:</p>
                    <p className="text-red-600 font-bold animate-pulse">
                      $ {subTotalofPQ}
                    </p>
                  </div>
                   <div
                    className="border bg-black text-white p-2 rounded-lg text-sm text-center hover:scale-95 hover:ring-red-500 ring-1 cursor-pointer"
                    
                  > 
                    <button onClick={() => {
                            handleCheckout()
                          }}
                    >Proceed to Checkout</button>
                   </div> 
                </div>
              </div>
            </div>
           
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
}
