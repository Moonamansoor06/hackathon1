import { NextRequest, NextResponse } from "next/server";
import { db, Cart } from "../../../lib/drizzle";
import { v4 } from "uuid";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

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