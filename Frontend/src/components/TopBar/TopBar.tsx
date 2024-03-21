import React from 'react'
import { BsBell } from "react-icons/bs";

const TopBar = () => {
  return (
    <div className='bg-[#babde5] w-full px-[10px] py-[20px]'>
        <div className=''>
            <input type="text" className='oultine outline-none min-w-[350px] pl-[10px] py-[10px] rounded-[2px]' placeholder='Search'/>
        </div>
    </div>
  )
}

export default TopBar