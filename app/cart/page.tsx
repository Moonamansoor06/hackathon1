"use client";
import React from "react";
import { Cart } from "@/lib/drizzle";
import { TiTrash } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { getAllProducts } from "../../fetch/productsList";
import Image from "next/image";
import getStripePromise from "@/lib/stripe";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

type CookiesUid = {
  cookiesuid: string | undefined;
};

export default async function CartPage(userId) {
  const { refresh } = useRouter();
  const res = await getAllProducts();

  const handleToast = () => {
    toast.error("Successfully Deleted!");
  };

  // delete api handle
  const handleDelete = async (id: number) => {
    try {
      if (id) {
        const response = await fetch(`/api/cart?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          refresh();
        } else {
          console.log("Delete request failed with status:", response.status);
        }
      }
    } catch (error) {
      console.log("An error occurred during the delete request:", error);
    }
  };
  // del api end

  // subtotal
  let PQ = res
    .filter((items) => items.user_id === userId)
    .map((items) => items.price * items.quantity);

  let subTotalofPQ = 0;

  for (let i = 0; i < PQ.length; i++) {
    subTotalofPQ += PQ[i];
  }

  // items in cart
  let qArray = res
    .filter((items) => items.user_id === userId)
    .map((items) => items.quantity);

  let qSum = 0;

  for (let i = 0; i < qArray.length; i++) {
    qSum += qArray[i];
  }

  // checkout button handle
  const handleCheckout = async () => {
    const stripe = await getStripePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(res),
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <div>
      {!res.filter((items) => items.user_id === userId).length && (
        <div className="text-3xl text-slate-400 font-bold text-center pt-10 h-auto">
          No Items Available
        </div>
      )}

      {res.filter((items) => items.user_id === userId).length > 0 && (
        <>
          <div>
            <h1 className="text-xl font-extrabold mt-12 mb-6 mx-2 p-2">
              Shopping Cart
            </h1>
          </div>
          <div className="md:flex flex-between">
            {/* product details */}

            <div className="flex flex-col flex-between w-full gap-2">
              {res
                .filter((items) => items.user_id ===userId)
                .map((mapitems, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row border border-slate-200 rounded-lg p-1 mx-2"
                  >
                    <div>
                      <Link
                        key={i}
                        href={`/soloproducts/${mapitems.product_id}`}
                        passHref
                      >
                        <div className="flex overflow-hidden object-cover h-16 w-16 md:h-48 md:w-44 rounded-lg">
                          <Image
                            src={mapitems.product_image}
                            alt="productimage"
                            width={200}
                            height={200}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="md:ml-5 ml-0  rounded-lg w-full flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <div key={i} className="flex flex-col gap-y-1 py-1">
                            <Link
                              href={`/soloproducts/${mapitems.product_id}`}
                              passHref
                            >
                              <div className="test-sm md:text-md font-extrabold hover:italic">
                                {mapitems.title}
                              </div>
                            </Link>
                            <div className="text-slate-400 text-xs font-bold">
                              {mapitems.generic_name}
                            </div>
                            <div className="test-sm md:text-md font-bold">
                              $ {mapitems.price * mapitems.quantity}
                            </div>
                          </div>
                        </div>
                        <div
                          className="hover:scale-105 cursor-pointer"
                          onClick={() => {
                            handleDelete(mapitems.id), handleToast();
                          }}
                        >
                          <TiTrash size={25} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-1">
                        <div className="font-extrabold text-sm">
                          Delivery Estimation
                        </div>
                        <div className="text-pink-500 font-bold text-xs">
                          5 - 10 Working Days
                        </div>
                      </div>
                      {/* price and quantity div */}
                      <div className="flex justify-between mt-2">
                        <div className="text-xs text-slate-500 flex items-center justify-center gap-x-6">
                          <div>Qty: {mapitems.quantity}</div>{" "}
                          <div> Size: {mapitems.size}</div>
                        </div>
                      </div>
                      {/* price and quantity div ends */}
                    </div>
                  </div>
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
                    onClick={handleCheckout}
                  >
                    <button>Proceed to Checkout</button>
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



// "use client"
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/nextjs';
// import { db, Cart, } from '@/lib/drizzle';
// import { eq } from 'drizzle-orm';
// import getProductById from '@/fetch/productbyid'

// interface CartPageProps {
//   onProductDetails: (productId: number) => void;
//   handleAddToCart: (cartItem) => void;
// }

//  const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
// //   const { isLoaded, userId } = useAuth();

//   useEffect(() => {
//     const fetchCartItems = async () => {

//       try {
//         const customerData=await fetch('api/cart/')
//         const {userId}=await customerData.json()
//         const customerId=userId
//         // if (isLoaded) {
//         //   const customerId = userId;
  
//           // Fetch the cart for the customer
//           const cart = await db
//             .select().from(Cart)
//             .where(eq( Cart.Buyerid,customerId ))
            
  
//           if (cart) 
//         {
//             const cartItems = await db
//               .select().from(Cart)
                         
//               const cartItemsWithProduct = await Promise.all(
//                 cartItems.map(async (cartItem) => {
//                   const product = await getProductById(Cart.ProductId);
//                   return { ...cartItem, product };
//                 })
//               );
    
//               setCartItems(cartItemsWithProduct);
            
//           }
        
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };
  
//     fetchCartItems();
//   }, [cartItems]);
  

//   const handleRemoveItem = async (itemId) => {
//     try {
//       await db
//         .delete(Cart)
//         .where(eq(Cart.Cartitemid, itemId)  )
//         .returning();
      
//     } catch (error) {
//       console.error('Error removing item:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Cart</h1>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.cartItemId}>
//             Product: {item.productId}, Quantity: {item.quantity}, Price: {item.price}
//             <button onClick={() => handleRemoveItem(item.cartItemId)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CartPage;
