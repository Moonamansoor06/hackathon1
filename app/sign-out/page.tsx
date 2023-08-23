"use client"
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

  export default function Home() {

    const router=useRouter()
    const handleClick=()=>{
      router.push('/')
    }
    return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white rounded-lg p-8">
        <h1 className="text-2xl text-center font-bold mb-4">Do you wish to sign out?</h1>
        <div className="flex justify-evenly">
          <SignOutButton/>
          <button className="flex justify-center" onClick={handleClick}> Cancel</button>
        </div>
      </div>
    </div>
    );
  }