import {
  integer,
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
    cartid: serial('cartid').primaryKey(),
    cartitemid:varchar('cartitemid'),
    buyerid: varchar('buyerid'),
    email: text('email').notNull(),
    productId: integer('productid').notNull(),
    productname:text('productname'),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
  
  },
  (cart) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(cart.cartid),
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
export type CartType = InferModel<typeof Cart>;
export type newCart = InferModel<typeof Cart, 'insert'>;

export const db = drizzle(sql);