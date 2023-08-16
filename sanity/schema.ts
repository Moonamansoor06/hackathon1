import { SchemaTypeDefinition } from 'sanity';

import user from './schemas/user';
import seller from './schemas/seller';
import product from './schemas/product';
import category from './schemas/category';
import order from './schemas/order';
import orderItem from './schemas/orderItem';
import payment from './schemas/payment';
import address from './schemas/address';
import review from './schemas/review';
import cartItem from './schemas/cartItem';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, seller, product, category, order, orderItem, payment, address, review, cartItem],
};
