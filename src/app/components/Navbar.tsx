"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
// import { useShoppingCart } from "use-shopping-cart";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { motion } from "framer-motion";
import { links } from "../constants/NavLinks";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useShoppingCart } from "use-shopping-cart";



export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  // const { handleCartClick } = useShoppingCart();
  const [open, setOpen] = useState(false)
  // const { isSignedIn, user, isLoaded } = useUser()

  // if (!isLoaded) {
  //   return <div>Loading...</div>
  // }

  // if (!isSignedIn) {
  //   return <div>Sign in to view this page</div>
  // }


  const listVariants = {
    closed: {
      x: "100%",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <header className=" border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Next<span className="text-primary">Commerce </span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
          <div className="lg:hidden font-extrabold text-gray-600 hover:text-primary  transition duration-100 cursor-pointer" onClick={()=>{setOpen(!open)}}>
            <Menu size={36}/>
          </div>
          {open && (     <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-full h-full bg-black text-gray-600  flex flex-col items-center justify-center gap-8 text-4xl z-40"
          > 
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.name}
              >
                <Link href={link.href} className="hover:text-primary  transition duration-100" onClick={()=>{setOpen(!open)}}>{link.name}</Link>
              
              </motion.div>
            ))}
            <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>  
          <SignUpButton mode="modal">
            <Button> Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          </motion.div> )}
          <ModeToggle/>
           <div className=" hover:text-gray-600 transition duration-100 py-2 px-4 rounded-md hidden lg:block">
          <SignedOut>
          <SignInButton mode="modal"><Button>Sign in</Button></SignInButton>  <SignUpButton mode="modal">
            <Button> Sign Up</Button></SignUpButton>
          </SignedOut>
          </div>
            <div className="mr-2">
            <SignedIn>
            <UserButton/>
          </SignedIn>
            </div>
        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}