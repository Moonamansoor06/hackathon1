import { db, Cart } from "@/lib/drizzle";
import { NextRequest,NextResponse } from "next/server";
import {v4} from "uuid"
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
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





// export async function DELETE(req: NextRequest) {
//     let url = req.nextUrl.searchParams;

//     try {
//         if (url.has("id")) {
//             let response = await db.delete(Cart).
//                 where(
//                     eq(Cart.Cartid, (url.get("id") as unknown as number))
//                    ).returning()
//             return NextResponse.json({ response });
//         }
//     } catch (error) {
//         console.log("error : ", (error as { message: string }).message)
//         return NextResponse.json({ error })
//     }
// }
//         quantity,
//         price } = req.body;

  
// const newItem=   await db.insert(CartItem).values({
//     cartId,
//     cartItemId,
//     productId,
//     quantity,
//     price
//   }).returning();

//     res.status(200).json({ message: 'Cart item added successfully.' });
//   } catch (error) {
//     console.error('Error adding cart item:', error);
//     res.status(500).json({ error: 'An error occurred while adding the cart item.' });
//   }
// };

// export const PUT = async (req, res) => {
//   try {
//     const { cartId, itemId } = req.params;
//     const { 
//         cartItemId,
//         productId,
//         quantity,
//         price }  = req.body;

//     // Update the cart item's quantity
//     await db.update(CartItem).set({ quantity }).where(eq(CartItem.cartId, cartId)).returning();

//     res.status(200).json({ message: 'Cart item updated successfully.' });
//   } catch (error) {
//     console.error('Error updating cart item:', error);
//     res.status(500).json({ error: 'An error occurred while updating the cart item.' });
//   }
// };

export const DELETE = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    // Delete the cart item
    const deletedCartItem = await db.delete(Cart).returning().where(eq(Cart.Cartid, cartId));

    res.status(200).json({ message: 'Cart item deleted successfully.',deletedCartItem });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the cart item.' });
  }
};

// export const GET = async (req, res) => {
//   try {
//     const { cartId } = req.params;

//     // Retrieve all cart items for the given cart ID
//     const cartItems = await db.select().from(CartItem).where(eq(CartItem.cartId, cartId))

//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error('Error getting cart items:', error);
//     res.status(500).json({ error: 'An error occurred while getting the cart items.' });
//   }
// };
