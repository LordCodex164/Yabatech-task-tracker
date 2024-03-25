import React, {useState} from 'react'
import { BsBell } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { Link } from 'react-router-dom';

const TopBar = () => {

  const [showProfile, setShowProfile] = useState<boolean>(false)
  
  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <div className='bg-[#C9EBF3] w-full px-[10px] py-[20px]'>
        <div className='flex justify-between items-center lg:pr-[50px]'>
            <input type="text" className='oultine outline-none min-w-[350px] pl-[10px] py-[10px] rounded-[2px]' placeholder='Search'/>

            <div className='flex relative items-center gap-[20px]'>
              <BiSolidUser onClick={handleShowProfile} className='w-[80px] h-[22px]'/>
               {showProfile &&<div className='absolute top-[22px] right-20 px-[10px] py-[20px] rounded-[10px] bg-[#fff] shadow-md z-10'>
                 <Link to={"/Profile"}>Profile</Link>
               </div>}
              <BsBell className='w-[50px] h-[22px]'/>
            </div>

        </div>
    </div>
  )
}

export default TopBar