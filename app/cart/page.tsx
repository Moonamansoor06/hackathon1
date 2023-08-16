"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { db, Cart, CartItem, newCartItem } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import getProductById from '@/fetch/productbyid'

interface CartPageProps {
  onProductDetails: (productId: number) => void;
  handleAddToCart: (cartItem: newCartItem) => void;
}

 const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const { isLoaded, userId } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {

      try {
        const customerData=await fetch('api/user/')
        const {userId}=await customerData.json()
        const customerId=userId
        // if (isLoaded) {
        //   const customerId = userId;
  
          // Fetch the cart for the customer
          const cart = await db
            .select().from(Cart)
            .where(eq( Cart.customerid,customerId ))
            
  
          if (cart) 
        {
            const cartItems = await db
              .select().from(CartItem)
              .where( eq(CartItem.cartId,Cart.cartid)  )
              
              const cartItemsWithProduct = await Promise.all(
                cartItems.map(async (cartItem) => {
                  const product = await getProductById(cartItem.productId);
                  return { ...cartItem, product };
                })
              );
    
              setCartItems(cartItemsWithProduct);
            
          }
        
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, [cartItems]);
  

  const handleRemoveItem = async (itemId: number) => {
    try {
      await db
        .delete(CartItem)
        .where(eq(CartItem.cartItemId, itemId)  )
        .returning();
      
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.cartItemId}>
            Product: {item.productId}, Quantity: {item.quantity}, Price: {item.price}
            <button onClick={() => handleRemoveItem(item.cartItemId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
