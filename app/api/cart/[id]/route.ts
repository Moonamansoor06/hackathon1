import { NextRequest, NextResponse } from "next/server";
import { db, Cart } from "../../../../lib/drizzle";
import { v4 } from "uuid";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const req = await request
  const thePath=req.nextUrl.pathname
  const buyerid = thePath.substring(thePath.lastIndexOf('/') + 1)
   console.log("id is", buyerid)
 if(buyerid){ 
  try {
    
    const cart = await db
      .select()
      .from(Cart)
      .where(eq(Cart.buyerid, buyerid));

    return NextResponse.json(cart);
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }} 
}

export async function POST(req: NextRequest) {
  const request = await req.json();

  console.log("user is ", request.reqBody.cartitem);

  try {
    const cartItem = request.reqBody.cartitem;
    const userId = request.reqBody.userid;
    const email = request.reqBody.email;
    console.log("email i s", email);
    //  let cart = await db.select().from(Cart)
    //   if (!cart) {

    const newCart = await db
      .insert(Cart)
      .values({
        cartitemid: cartItem.cartitemid,
        buyerid: userId,
        email: email,
        productId: cartItem.productId,
        productname: cartItem.Productname,
        quantity: 1,
        price: cartItem.price,
      })
      .returning();
    return NextResponse.json(newCart);
    //  }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    NextResponse.json({ error: "Failed to add item to cart" });
  }
}

export async function DELETE(request: NextRequest) {
// let req=await request
//   let url = req.nextUrl.searchParams;
const req = await request
console.log("req i s",req)
  const thePath=req.nextUrl.pathname
  const buyerid = thePath.substring(thePath.lastIndexOf('/') + 1)
   console.log("id is from delete", buyerid)
  
  try {
     if(buyerid){
      let response = await db
        .delete(Cart)
        .where(eq(Cart.buyerid, buyerid) )
        .returning();
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}
