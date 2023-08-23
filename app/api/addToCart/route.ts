import { NextApiRequest, NextApiResponse } from 'next';
import { db, Cart, } from '@/lib/drizzle';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';


export async function POST(req:Request)  {
 
 const request=await req.json()  
 
 console.log("user is ",request.reqBody.cartitem)

    try {
    const  cartItem  = request.reqBody.cartitem;
    const userId=request.reqBody.userid
    const email=request.reqBody.email
    const customerId=userId as string 
    const cid=customerId.substring(5,5)
    console.log("cartItem details",cartItem.productId,"customer i d is",customerId)
    
  
    let cart = await db.select().from(Cart)
     .where(eq(Cart.Buyerid,cid))

       console.log("cart id is from cart",cart[0].Buyerid)
       // const cartid = generateUniqueCartId();
    if (!cart) {
  
      cart = await db
        .insert(Cart)
        .values({
          
           Cartitemid:cartItem.cartitemid,
           Buyerid:cid,
           Email: email,
           ProductId:cartItem.productId,
           ProductName:cartItem.productName,
           Quantity: cartItem.quantity.toString(),
           Price: cartItem.price.toString(), 
           
        })
        .returning()
      
    }


return NextResponse.json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    NextResponse.json({ error: 'Failed to add item to cart' });
  }}
   
  //   const newCartItem: newCartItem = {
      
  //     cartId: cart[0].cartid.toString(),
  //     productId:cartItem.productId,
  //     quantity: cartItem.quantity.toString(),
  //     price: cartItem.price.toString(),
  //   };

  //   await db.insert(CartItem).values(newCartItem).returning().execute();

    
  //   NextResponse.json({ message: 'Item added to cart successfully' });
  // } catch (error) {
  //   console.error('Error adding item to cart:', error);
  //   NextResponse.json({ error: 'Failed to add item to cart' });
  // }

