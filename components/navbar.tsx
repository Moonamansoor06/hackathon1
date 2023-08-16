"use client"
import React,{useState,useEffect} from "react";
import Image from "next/image";
import { Search, ShoppingCart,Menu, User2 } from "lucide-react";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { getAllcategories } from "@/fetch/categoryList";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";


 

 
  


const Navbar = () => {
   const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [categoryArray, setCategoryArray] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    router.push('/sign-out')
  };
const router=useRouter()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllcategories();
        setCategoryArray(categories);
      } catch (error) {
        
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  
    return (
      <nav className="relative z-10 flex justify-between items-center h-20 px-10">
      
      <div >
<NavigationMenu className="">
  <NavigationMenuList>
  <NavigationMenuItem>
     <NavigationMenuTrigger>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth="2" 
       strokeLinecap="round" strokeLinejoin="round" 
       className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/>
       <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
       </NavigationMenuTrigger>
               <NavigationMenuContent>
                {categoryArray.map((component,i) =>{ 
              
                return(
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[300px] ">
                 <ListItem  key={component.Category_ID} href={component.Name}>
                  {component.Name.toUpperCase()}
                 </ListItem>
                 </ul>
              )})}
             
           </NavigationMenuContent>
         </NavigationMenuItem>
        </NavigationMenuList>
</NavigationMenu>

</div>

<div className=" flex-shrink-0 py-8 p-4 w-40 h-40  md:h-40 md:w-40">
         <Image
          width={140}
          height={140}
           className="rounded-xl p-4"
           src="/zainiee1.jpg"
           alt="Zainiee"
         />

       </div>
       <div className="flex justify-between">
        <div className="mr-4">
          <button
            onClick={toggleDropdown}
            className="bg-gray-300 p-2 rounded-full"
          >
            <User2 />
          </button>
           {showDropdown && (
            <ul className="absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg z-20">
              {isLoaded && userId ? (
                <li>
                  <button onClick={handleSignOut} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Sign Out
                  </button>
                </li>
              ) : (
                <li>
                  <button onClick={() => router.push('/sign-up/')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Sign In/Sign Up
                  </button>
                </li>
              )} 
            </ul>
          )}
        </div>
     
      <div className="p-2 rounded-full bg-gray-300">
      
        <ShoppingCart className="relative " />
        <span className="absolute top-2  h-6 w-6 text-center rounded-full bg-[#f02d34] text-white">
          0
        </span>
      </div>
      </div> 
</nav>    
    );
  }


export default Navbar


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li  >
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


