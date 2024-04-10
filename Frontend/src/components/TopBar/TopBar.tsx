import React, {useState} from 'react'
import { BsBell } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import MobileSidemenu from '../SideMenu/MobileSidemenu';
import { BiMenu } from 'react-icons/bi';
import { FaNimblr } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const TopBar = ({data}:any) => {

  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false);


  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }
  const handleShowMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <>
    <div className='bg-[#C9EBF3] hidden sm:block w-full px-[10px] py-[20px]'>
        <div className='flex justify-between items-center pl-[30px] lg:pr-[50px]'>
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

    <div className="flex sm:hidden flex-row relative">
        <div className="absolute z-30">
          {showMobileMenu && <MobileSidemenu handleShowMobileMenu={handleShowMobileMenu} />}
        </div>
        <div className="h-[66px] flex lg:hidden border items-center justify-between w-full px-[50px] sticky top-0 bg-[#F2F9FD] z-10">
          <div className="flex flex-row  justify-between items-center gap-[35px] lg:gap-0  w-full">
            <div>
              <FiMenu onClick={handleShowMobileMenu}/>
            </div>
            <div>
            <BsBell className='w-[50px] h-[22px]'/>
            </div>
            {/* <div className="relative">
              <img
                src={Bell}
                alt=""
                className={`lg:pr-[12px] pr-[0px]  cursor-pointer ${
                  unreadNotificationsCount > 0 ? 'text-red-600' : ''
                }`}
                onClick={handleBellClick}
              />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-center text-sm">
                  {unreadNotificationsCount}
                </span>
              )}
            </div> */}
            {/* <CombineButton items={dropdownItems} businessName="Esemie" textColor="text-gray-500" size="small" /> */}
          </div>
        </div>
      </div>
    </>
    
  )
}

export default TopBar