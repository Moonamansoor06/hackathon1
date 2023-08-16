 "use client"
 import { Search, ShoppingCart,Menu } from "lucide-react";
 import React from "react";
 import Link from "next/link"



 const Navbar2 = () => {
  

return(
  <div  className="h-auto w-screen sticky inset-0 backdrop-blur-md  md:px-40 
  bg-opacity-90  flex justify-end items-end" >
  
  <div className="flex">
        <Search className="bg-white rounded-l" />{" "}
        <input
          type="text"
          placeholder="What you are looking for"
          className="rounded-r"
        ></input>
      
    </div> 
  
   </div>
)
 }
 export default Navbar2






