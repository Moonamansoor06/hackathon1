import { Cart } from "@/lib/drizzle";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

export type CookiesUid = string | undefined;

export default async function CartButton({
  res,
  
}) {
  let qArray = res
    .filter((items) => items.user_id === res.cartItem)
    .map((items) => items.quantity);

  let qSum = 0;

  for (let i = 0; i < qArray.length; i++) {
    qSum += qArray[i];
  }
  return (
    <div>
      <Link href="/cart" passHref>
        <div className="relative w-11 h-11 rounded-full bg-gray-200 justify-center items-center hidden lg:flex">
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-xs text-center place-items-center text-white hover:scale-105">
            {qSum}
          </div>
          <FiShoppingCart size={20} className="hover:scale-105" />
        </div>
      </Link>
    </div>
  );
}