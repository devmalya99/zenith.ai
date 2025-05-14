"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Compass, GalleryHorizontalEnd, LogIn, LogInIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const MenuOptions = [
  {
    title: "Home",
    icon: Search,
    path: "/",
  },
  {
    title: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    title: "Library",
    icon: GalleryHorizontalEnd,
    path: "/library",
  },
  
];

export function AppSidebar() {

  const path = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="bg-accent flex justify-center items-center">
        <Image src={"/logo_white.png"} alt="logo" width={240} height={140} />
      </SidebarHeader>

      <SidebarContent className="bg-accent">
        <SidebarGroup>
        <SidebarContent>
            <SidebarMenu>
                {
                    MenuOptions.map((menu,index) => (
                        <SidebarMenuItem key={menu.title}>
                        <SidebarMenuButton asChild className={`group w-full transition-colors duration-200 ${path===menu.path ? "bg-gray-300 text-bold" : "bg-accent"}`}>
                          <Link 
                            href={menu.path}
                            className={`flex items-center gap-4 px-4 py-4 rounded-lg mb-2 hover:bg-transparent
                            hover:text-bold 
                            text-gray-700 dark:text-gray-300 transition-all duration-200 relative overflow-hidden`}
                          >
                            <span className="flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                              <menu.icon className="w-5 h-5" />
                            </span>
                            <span className="text-lg font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                              {menu.title}
                            </span>
                          </Link>  
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>

              

            {/* //if the user is signed in then show signout button */}
            <SignedIn>
             <SignOutButton>
               <Button className="rounded-xl">SignOut</Button>
             </SignOutButton>
            </SignedIn>

           

            {/* //if the user is signed out then show signup page */}
            <SignedOut>
            <SignUpButton mode="modal">
              <Button className="rounded-xl">SignUp</Button>
            </SignUpButton>
            </SignedOut>

            
        </SidebarContent>
        </SidebarGroup>


        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 my-2 border border-gray-200  rounded-xl">
            <p className="text-bold mb-2 text-blue-700">Try Zenith pro+</p>
            <p>Upgrade for image upload , smarter ai and more</p>

            <div className="flex justify-between ">
              <Button className={"mt-2"}>Upgrade</Button>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button className={"mt-2"}>Sign In</Button>
              </SignInButton>
            </SignedOut>


            </div>
            

        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
