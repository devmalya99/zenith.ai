import {
  LucideImage,
  LucideList,
  LucideSparkle,
  LucideVideo,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnswerDisplay } from "./AnswerDisplay";
import { ImageDisplay } from "./ImageDisplay";
import { VideoDisplay } from "./VideoDisplay";
import {API_BASE_URL} from "../../../../services/api_base_url";
import axios from "axios";
import { searchData } from "../../../../_data/searchData";
const tabs = [
  { label: "Answer", icon: LucideSparkle },
  { label: "Images", icon: LucideImage },
  { label: "Videos", icon: LucideVideo },
  { label: "Sources", icon: LucideList, badge: 10 },
];

const DisplayResult = ({ searchInputRecord }) => {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult,setSearchResult]=useState(searchData)

  useEffect(() => {
    //to prevent unnecessary api calls during production
      // searchInputRecord && GetSearchApiResult();
      
      console.log("Setting mock result...");
      setSearchResult(searchData)

  }, [searchInputRecord]);

      console.log("searchResult",searchResult)



  const GetSearchApiResult = async ()=>{
    const result = await axios.post(`${API_BASE_URL}/api/search-api`,
      {
        userInput:searchInputRecord?.userSearchInput,
        searchType:searchInputRecord?.type
      }
    );

    console.log("result",result)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {searchInputRecord?.userSearchInput}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          About 1,240 results (0.42 seconds)
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
        {tabs.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${
              activeTab === label ? "text-black" : ""
            }`}
          >
            <Icon className="w-4 h-4" />

            <span>{label}</span>

            {badge && (
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}

            {activeTab === label && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
            )}
          </button>
        ))}

        <div className="ml-auto text-sm text-gray-500">
          1 task <span className="ml-1">↗</span>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300 ease-in-out">
        {activeTab === "Answer" && (
          <div className="animate-fadeIn">
            <AnswerDisplay searchResult={searchResult?.data} />
          </div>
        )}
        {activeTab === "Images" && (
          <div className="animate-fadeIn">
            <ImageDisplay />
          </div>
        )}
        {activeTab === "Videos" && (
          <div className="animate-fadeIn">
            <VideoDisplay />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResult;
