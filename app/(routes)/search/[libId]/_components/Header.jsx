import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Clock, Link, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const Header = ({searchInputRecord}) => {
  return (
    <div className="flex items-center justify-between m-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
  {/* User section */}
  <div className="flex-shrink-0 ml-1">
    <UserButton className="ring-2 ring-blue-100 dark:ring-blue-900 rounded-full shadow-sm" />
  </div>

  {/* Timestamp */}
  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm ml-4 mr-auto">
    <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
    <span className="font-medium">{moment(searchInputRecord?.created_at).fromNow()}</span>
  </div>

  {/* Search Query - Center positioned with visual emphasis */}
  <h2 className="flex-grow mx-4 text-center font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 max-w-md px-3 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
    {searchInputRecord?.userSearchInput}
  </h2>

  {/* Action buttons */}
  <div className="flex gap-2 flex-shrink-0">
    <Button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 flex items-center gap-1 shadow-sm transition-colors duration-200">
      <Link className="w-4 h-4" />
    </Button>
    
    <Button className="">
      <Send className="w-4 h-4" />
      <span className="font-medium">Share</span>
    </Button>
  </div>
</div>
  )
}

export default Header