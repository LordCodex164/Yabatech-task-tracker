import React, {useEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import cx from "classnames"
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'

const SideMenu = ({admin}:any) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const {logout} = UseGlobalAuth()

  const navigate = useNavigate()

  const menuItems = [
    {
      paths: ['/dashboard'],
      label: 'Dashboard',
      to: '/admin',
    },
    {
      paths: admin ? ['/Assign'] : ["View Tasks"],
      label: 'Assign',
      to: '/admin/assign',
    },
    {
      paths: admin ? ['/Assign Tasks'] : ["View Tasks"],
      label: 'Profile',
      to: 'Profile',
    },
    {
      paths: ['/auth/register'],
      label: 'Logout',
      to: '/auth/register',
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
            <div className='text-[#000] text-center font-extralight text-[30px]'> 
               {menuItem.label}
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
            <div className='text-[#000] text-center '> 
               {menuItem.label}
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
    <aside className={cx("relative text-center bg-[#ebd6d1] border-r-[2px] border-[#d04040] pt-[40px]", {
      "w-[50px]": isCollapsed,
      "w-[350px]": !isCollapsed
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