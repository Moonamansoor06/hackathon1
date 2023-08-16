import { NextApiRequest, NextApiResponse } from 'next';
import { db, Cart, CartItem, newCartItem } from '@/lib/drizzle';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import UseUser from '@/fetch/fetchUser/useUser';
import { eq } from 'drizzle-orm';


export async function POST(req:Request)  {
 
 const request=await req.json()  
 
 console.log("user is ",request.reqBody.cartitem)

    try {
    const  cartItem  = request.reqBody.cartitem;
    const userId=request.reqBody.userid
    const email=request.reqBody.email
    console.log("cartItem details",cartItem,"usrid",userId)
    const customerId=userId as string //userId
    
    let cart = await db.select().from(Cart)
   .where(eq(Cart.customerid,customerId))
     // const cartid = generateUniqueCartId();
    if (!cart) {
  
      cart = await db
        .insert(Cart)
        .values({
          
          customerid: userId,
           email: email,
        })
        .returning()
      
    }
console.log("cart is ",cart)
   
    const newCartItem: newCartItem = {
      
      cartId: cart[0].cartid.toString(),
      productId:cartItem.productId,
      quantity: cartItem.quantity.toString(),
      price: cartItem.price.toString(),
    };

    await db.insert(CartItem).values(newCartItem).returning().execute();

    
    NextResponse.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    NextResponse.json({ error: 'Failed to add item to cart' });
  }
}

