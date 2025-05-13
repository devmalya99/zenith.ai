"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Atom,
  AudioLinesIcon,
  Cpu,
  Ghost,
  Globe,
  Mic,
  Paperclip,
  Pin,
  SearchCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AIModelsOption } from "@/services/Shared";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";


const ChatBoxInput = () => {

  const [userSearchInput, setUserSearchInput] = useState();
  const [searchType, setSearchType] = useState("search");
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const {user} = useUser();
  const onSearchQuery =async () => {
    
    setLoading(true);
    const libId=uuidv4();

    const result = await supabase.from('Library').insert([{ 
      userSearchInput:userSearchInput,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      type: searchType,
      libId:libId

    }]).select();

    //
    
    setLoading(false);
    //redirect to new screen
    router.push('/search/'+libId)
  }

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Image src={"/logo_white.png"} alt="logo" width={360} height={240} />

      <div className="p-4 w-full max-w-2xl rounded-lg border border-gray-300">
        <div className="flex justify-between">
          <Tabs defaultValue="search" className="w-[400px]">
            <TabsContent value="search">
              <input
                type="text"
                placeholder="Ask anything..."
                onChange={(e) => setUserSearchInput(e.target.value)}
                className="w-full   text-black focus:outline-none p-4"
              />
            </TabsContent>
            <TabsContent value="research">
              <input
                type="text"
                onChange={(e) => setUserSearchInput(e.target.value)}
                placeholder="Research anything..."
                className="w-full  text-black focus:border-gray-400 focus:outline-none p-4"
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger value="search" 
              className={"text-primary"}
              onClick={() => {
                setSearchType("search")
              }}
              >
                <SearchCheck />
                Search
              </TabsTrigger>

              <TabsTrigger 
              onClick={() => setSearchType("research")} 
              value="research" 
              className={"text-primary"}>
                <Atom />
                Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-3 items-end p-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"}>
                  <Cpu className="text-gray-400 h-5 w-5  hover:text-blue-800" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}

                {AIModelsOption.map((model,index)=>{
                  return <DropdownMenuItem key={index}>
                    <div className="mb-1">
                        <h2>{model.name}</h2>
                        <p className="text-xs">{model.desc}</p>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuItem>
                })}
                
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant={"ghost"}>
              <Globe className="text-gray-400 h-5 w-5  hover:text-blue-800" />
            </Button>

            <Button variant={"ghost"}>
              <Paperclip className="text-gray-400 h-5 w-5  hover:text-blue-800" />
            </Button>

            <Button variant={"ghost"}>
              <Mic className="text-gray-400 h-5 w-5  hover:text-blue-800" />
            </Button>

            <Button onClick={()=>{userSearchInput? onSearchQuery():null}} >
              {
                 userSearchInput? 
                <ArrowRight className="text-gray-200 h-4 w-4 hover:text-blue-800" /> 
                :
                <AudioLinesIcon className="text-gray-200 h-4 w-4 hover:text-blue-800" disabled={loading} />

              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxInput;
