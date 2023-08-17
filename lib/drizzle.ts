import {
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const Cart = pgTable(
  'cart',
  {
    Cartid: serial('cartid').primaryKey(),
    Cartitemid:text('cartitemid'),
    Buyerid: varchar('Buyerid'),
    Email: text('email').notNull(),
    ProductId: numeric('productid').notNull(),
    ProductName:text('productName'),
    Quantity: numeric('quantity').notNull(),
    Price: numeric('price').notNull(),
  
  },
  (cart) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(cart.Cartid),
    };
  }
);

// export const CartItem = pgTable(
//   'cartitem',
//   {
//     cartitemid: serial('cartitemid').primaryKey(),
//     cartId: numeric('cartid').notNull(),
//     productId: numeric('productid').notNull(),
//     quantity: numeric('quantity').notNull(),
//     price: numeric('price').notNull(),
//   },
//   (cartItem) => {
//     return {
//       uniqueIdx: uniqueIndex('unique_idx').on(cartItem.cartitemid),
//     };
//   }
// );

// export type CartItem = InferModel<typeof CartItem>;
// export type newCartItem = InferModel<typeof CartItem, 'insert'>;
export type Cart = InferModel<typeof Cart>;
export type newCart = InferModel<typeof Cart, 'insert'>;

export const db = drizzle(sql);