// import { NextRequest, NextResponse } from "next/server";
// import { NextApiRequest } from "next";

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(nreq:NextApiRequest, req,res:NextApiRequest) {
//   if (nreq.method === 'POST') {
//     try {
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: '{{PRICE_ID}}',
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${req.headers.origin}/?success=true`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       });
//       res.redirect(303, session.url);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }

import { getAllProducts } from "../../../fetch/productsList";
import { newCart } from "../../../lib/drizzle";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { NextApiRequest } from "next";
const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});


export async function POST(req: Request) {
  const request = await req.json() as newCart[];
  const origin = req.headers.get("origin") || "http://localhost:3000";
    
 console.log("request is ",request)

 const success_url = !request[0].buyerid
 ? `${origin}/signup?session_id={CHECKOUT_SESSION_ID}`
 : `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`;

    try {
    //   length will also be according to the cookies user_id
    if (request.length>0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [
          { shipping_rate: "shr_1NoVqZJpRBqGCZM0UomzvFZZ" },
        
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: request.map((mapitems) => 
        {
          return {
              price_data:
                {
                    currency: "usd",
                    product_data:
                    {
                      name: mapitems.productId.toString(), 
                    }, 
                    unit_amount:  mapitems.price * 100,         
      
                },
            quantity: mapitems.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        success_url:success_url,
        cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      });
      NextResponse.redirect( session.url)
      return NextResponse.json({ session });
    
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}