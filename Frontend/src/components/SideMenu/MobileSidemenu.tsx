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
            paths: userData.isAdmin ? ['/Dashboard'] : ["/staff"],
            label: userData.isAdmin  ? 'Dashboard' : "Home",
            to: userData.isAdmin  ? '/admin' : "/staff",
            icon: <RxDashboard/>
          },
          {
            paths: userData.isAdmin  ? ['/Assign'] : ["Tasks"],
            label: userData.isAdmin  ? 'Assign' : "Tasks",
            to: userData.isAdmin  ? '/admin/assign' : "/staff/listTask",
            icon: <GrDashboard/>
          },
          {
            paths: ["Profile"],
            label: 'Profile',
            to: "/profile",
            icon: <ImProfile/>
          },
        ]
         const isActive = (paths: string[]) => {
                return paths.some((path) => pathname.startsWith(path));
              }; 
              
              const handleMenuItemClick = () => {
              setIsMenuOpen(false);
              handleShowMobileMenu();
            };


        const renderMenuItem = (menuItem: any) => {
           
              if(menuItem.label === "Logout" ) {
                return (
                <li key={menuItem.to}>
                 <Link to={"/auth"}
                  onClick={logout}
                  className={cx({
                    'h-[55px] flex justify-center items-center mt-[150px]': true,
                      'w-full': !isCollapsed,
                      'w-[59px]': isCollapsed,
                      "hover:before:content-[''] hover:before:w-[10px] ": true,
                      'hove] hover:before:h-[55px] hover:bg-[#e75045] text-white': true,
                      'hover:before:relative  hover:rounded-r-[5px]': true,
                      " visited:text-red-800": true
                  })}
                  >
                     <div>
                      {!isCollapsed && 
                      <div className='text-[#000] text-center font-extralight text-[30px] flex gap-5 items-center'> 
                         {menuItem.label}
                         <span>{menuItem.icon}</span>
                      </div>
                      }
                     </div>
                  </Link>
                </li>
                )
                
              }

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
                    'text-[#222222]': isActive(menuItem.paths),
                    'text-white': !isActive(menuItem.paths),
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
          className={cx('bg-[#0A78B2] block lg:hidden relative min-h-screen justify-center items-center ',  {
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
        <span className="ml-12 gap-[10px] flex font-medium">
          <FiLogOut/>
          Logout
        </span>
      </button>
          
      
    
        </aside>
      )
    }
    
    export default MobileSidemenu