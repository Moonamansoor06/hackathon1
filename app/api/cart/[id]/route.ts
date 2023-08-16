import { NextRequest, NextResponse } from "next/server";
import { Cart, CartItem } from '@/lib/drizzle';
import { db } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';

export const POST = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { 
        cartItemId,
        productId,
        quantity,
        price } = req.body;

  
const newItem=   await db.insert(CartItem).values({
    cartId,
    cartItemId,
    productId,
    quantity,
    price
  }).returning();

    res.status(200).json({ message: 'Cart item added successfully.' });
  } catch (error) {
    console.error('Error adding cart item:', error);
    res.status(500).json({ error: 'An error occurred while adding the cart item.' });
  }
};

export const PUT = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;
    const { 
        cartItemId,
        productId,
        quantity,
        price }  = req.body;

    // Update the cart item's quantity
    await db.update(CartItem).set({ quantity }).where(eq(CartItem.cartId, cartId)).returning();

    res.status(200).json({ message: 'Cart item updated successfully.' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'An error occurred while updating the cart item.' });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    // Delete the cart item
    const deletedCartItem = await db.delete(Cart).returning().where(eq(Cart.cartid, cartId));

    res.status(200).json({ message: 'Cart item deleted successfully.',deletedCartItem });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the cart item.' });
  }
};

export const GET = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Retrieve all cart items for the given cart ID
    const cartItems = await db.select().from(CartItem).where(eq(CartItem.cartId, cartId))

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ error: 'An error occurred while getting the cart items.' });
  }
};
