import { getAuth, clerkClient } from "@clerk/nextjs/server";
import  { NextApiRequest, NextApiResponse } from "next";
import { NextResponse,NextRequest} from "next/server";

 
export  async function GET(
  req: NextRequest,
  
) {
  const { userId } = getAuth(req);
 
  if (!userId) {
    
    return NextResponse.json({ error: "Unauthorized" });
  }
 
  const user = userId ? await clerkClient.users.getUser(userId) : null;
 
 
  return NextResponse.json({user});
}