import { NextRequest, NextResponse } from "next/server";
import { db, Cart } from "../../../lib/drizzle";
import {v4} from "uuid"
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const res = await db.select().from(Cart);
    return NextResponse.json(res);
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}


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
       // .where(eq(Cart.Buyerid,customerId))
   
    //      console.log("cart id is from cart",cart[0].Buyerid)
          // const cartid = generateUniqueCartId();
       if (!cart) {
     
         const newCart = await db
           .insert(Cart)
           .values({
             
              Cartitemid:cartItem.cartitemid,
              Buyerid:cartItem.Buyerid,
              Email: email,
              ProductId:cartItem.productId,
              ProductName:cartItem.productName,
              Quantity: cartItem.quantity.toString(),
              Price: cartItem.price.toString(), 
              
           })
           .returning()
       return NextResponse.json(newCart);  
       }
   
   
   
     } catch (error) {
       console.error('Error adding item to cart:', error);
       NextResponse.json({ error: 'Failed to add item to cart' });
     }}
      


export async function DELETE(req: NextRequest) {
    let url = req.nextUrl.searchParams;

    try {
        if (url.has("Buyerid")) {
            let response = await db.delete(Cart).
                where(
                    eq(Cart.Buyerid, (url.get("Buyerid")))
                        ).returning()
            return NextResponse.json({ response });
        }
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}