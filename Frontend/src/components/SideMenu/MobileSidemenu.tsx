import React, {useEffect, useRef, useState} from 'react'
import { Link, Navigate, useLocation} from 'react-router-dom'
import cx from "classnames"
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { ImProfile } from 'react-icons/im'
import { GrDashboard } from 'react-icons/gr'
import { FiLogOut } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { GiTrackedRobot } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'   


interface MobileProps {
    handleShowMobileMenu: () => void
}

    const MobileSidemenu = ({handleShowMobileMenu}: MobileProps) => {
        const [isCollapsed, setIsCollapsed] = useState(false)

        const {logout} = UseGlobalAuth()
      
        const [cookies] = useCookies()

        const menuRef = useRef<HTMLDivElement>(null);

        const [isMenuOpen, setIsMenuOpen] = useState(false);
      
        const {pathname} = useLocation()

        const {userData} = UseGlobalAuth()
      
        const menuItems = [
          {
            paths: userData.isAdmin ? ['/admin'] : ["/staff"],
            label: userData.isAdmin  ? 'Dashboard' : "Home",
            to: userData.isAdmin  ? '/admin' : "/staff",
            icon: <RxDashboard/>
          },
          {
            paths: userData.isAdmin  ? ['/admin/assign'] : ["/staff/listTask"],
            label: userData.isAdmin  ? 'Assign' : "Tasks",
            to: userData.isAdmin  ? '/admin/assign' : "/staff/listTask",
            icon: <GrDashboard/>
          },
          {
            paths: ["/profile"],
            label: 'Profile',
            to: "/profile",
            icon: <ImProfile/>
          },]

          const pathName = location.pathname

          const isActive = (paths: string[]) => {
            const isActivePath = paths.includes(pathName)
            return isActivePath
          }; 
              
          const handleMenuItemClick = () => {
            setIsMenuOpen(false);
            handleShowMobileMenu();
          };


          const renderMenuItem = (menuItem: any) => {
            return (
              <li key={menuItem.to} className="group mb-3 mt-4">
                <Link
                  to={menuItem.to}
                  onClick={handleMenuItemClick}
                  className={cx({
                    'h-[55px] flex items-center': true,
                    'w-[212px]': !isCollapsed,
                    'w-[59px]': isCollapsed,
                    "before:content-[''] before:w-[10px] before:bg-[#FF6702]": isActive(menuItem.paths),
                    'before:rounded-l-[10px] before:h-[55px] bg-[#C9EBF3]': isActive(menuItem.paths),
                    'before:relative before:left-[-5px] rounded-r-[5px]': isActive(menuItem.paths),
                    "hover:before:content-[''] hover:before:w-[10px] ": true,
                    'hover:before:rounded-l-[10px] hover:before:h-[55px] mr-[10px] ml-[20px] hover:bg-[#C9EBF3]': true,
                    'hover:before:relative hover:before:left-[-5px] hover:rounded-r-[5px] mr-[10px]': true,
                    "hover:bg-[#c9ebf3] bg-[#9bd6e3]": isActive(menuItem.paths),
                    'hover:text-[#222222]': true,
                    collapsed: isCollapsed,
                  })}
                >
                  <div className="flex items-center justify-between w-[59px] h-full px-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-light">{menuItem.icon}</span>
                      {!isCollapsed && <span className="font-medium text-base">{menuItem.label}</span>}
                    </div>
                  </div>
                </Link>
              </li>
            );
          };
      
      
      return (
        <aside
        ref={menuRef}
          className={cx('bg-[#0A78B2] z-50 block lg:hidden relative min-h-screen justify-center items-center ',  {
            'w-[92px]': isCollapsed,
            'w-[250px]': !isCollapsed,
          })}
        >
           {isMenuOpen && ( 
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsMenuOpen(false)} 
          ></div>
        )}
         <div className="w-full flex flex-col items-center justify-center">
          <div className="flex w-[250px] items-center gap-[50px] justify-center p-4">
            <span className='w-[100px]'><GiTrackedRobot/></span> 
            <span className='text-white' onClick={handleShowMobileMenu}><IoClose/></span>
          </div>
        
          <nav className=''>
            <ul className='flex flex-col items-center justify-center'>
              {menuItems.map((menuItem) => renderMenuItem(menuItem))}
            </ul>
          </nav>
          </div> 
          
  
  
          <button
        onClick={logout}
        className="flex items-center mt-[140px] w-[220px] text-white rounded hover:bg-opacity-90 transition duration-200 hover:before:bg-[#FF6702] hover:before:content-[''] hover:before:w-[10px] hover:before:rounded-l-[14px] hover:before:h-[55px] hover:bg-[#C9EBF3] hover:text-[#222222] hover:before:relative hover:before:left-[px] hover:rounded-r-[px]"
        style={{ marginRight: "10px", marginLeft: "10px" }}
      >
        <span className="ml-12 gap-[10px] flex items-center font-medium">
          <FiLogOut/>
          Logout
        </span>
      </button>
          
      
    
        </aside>
      )
    }
    
    export default MobileSidemenu