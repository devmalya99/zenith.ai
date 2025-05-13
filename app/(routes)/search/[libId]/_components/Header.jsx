import { UserButton } from '@clerk/nextjs'
import { Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const Header = ({searchInputRecord}) => {
  return (
    <div className='flex justify-between m-2 p-1 border border-gray-600 rounded-xl bg-teal-50'>
        <div className='p-2'>
            <UserButton/>
        </div>

        <div className='flex gap-2 justify-between p-2 '>
            <Clock/>
            <h2>{moment(searchInputRecord?.created_at).fromNow()}</h2>
        </div>
        
    </div>
  )
}

export default Header