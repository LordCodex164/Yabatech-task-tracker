import React, {useEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import cx from "classnames"
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { ImProfile } from 'react-icons/im'
import { GrDashboard } from 'react-icons/gr'
import { FiLogOut } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
const SideMenu = ({admin}:any) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const {logout} = UseGlobalAuth()

  const navigate = useNavigate()

  const {authData} = UseGlobalAuth()
  
  console.log(authData)

  const menuItems = [
    {
      paths:  authData.isAdmin ? ['/Dashboard'] : ["/Home"],
      label: authData.isAdmin ? 'Dashboard' : "Home",
      to: authData.isAdmin ? '/admin' : "/staff",
      icon: <RxDashboard/>
    },
    {
      paths: authData.isAdmin ? ['/Assign'] : ["View Tasks"],
      label: authData.isAdmin ? 'Assign' : "View",
      to: authData.isAdmin ? '/admin/assign' : "/staff/viewTask",
      icon: <GrDashboard/>
    },
    {
      paths: ["Profile"],
      label: 'Profile',
      to: "/profile",
      icon: <ImProfile/>
    },
    {
      paths: ['/auth/register'],
      label: 'Logout',
      to: '/auth/register',
      icon: <FiLogOut/>
    },
  ]

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  } 

  
  
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
      <li key={menuItem.to} >
        <Link 
        to={menuItem.to}
        className={cx({
          'h-[55px] flex justify-center items-center my-[25px]': true,
            'w-full': !isCollapsed,
            'w-[59px]': isCollapsed,
            "hover:before:content-[''] hover:before:w-[10px] ": true,
            'hove] hover:before:h-[55px] hover:bg-[#C9EBF3]': true,
            'hover:before:relative  hover:rounded-r-[5px]': true,
            "active:text-red-600 visited:text-red-800": true
        })}
        >
           <div>
            {!isCollapsed && 
            <div className='text-[#000] text-center flex flex-row gap-5 items-center'> 
               {menuItem.label}
               {menuItem.icon}
            </div>
            }
           </div>
        </Link>
      </li>
    )
  }

  //something to make thelink active

  useEffect(() => {

  }, [])

  return (
    <aside className={cx("relative text-center bg-[#8996d7] border-r-[2px] border-[#8879e6] pt-[40px] px-[15px]", {
      "w-[50px]": isCollapsed,
      "w-[280px]": !isCollapsed
    })}>
       <nav className=''>
           <ul className=''>
            <span className='text font-bold'>Task Tracker App</span>
            {menuItems.map((item) => renderMenuItem(item))}
           </ul>
       </nav>

       
    </aside>
  )
}

export default SideMenu