import {useEffect, useState} from 'react'
import { Link, useLocation} from 'react-router-dom'
import cx from "classnames"
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { ImProfile } from 'react-icons/im'
import { GrDashboard } from 'react-icons/gr'
import { FiLogOut } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'

const SideMenu = ({data}:any) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const {logout} = UseGlobalAuth()

  const {pathname} = useLocation()

  const menuItems = [
    {
      paths: data.isAdmin ? ['/admin'] : ["/staff"],
      label: data.isAdmin  ? 'Dashboard' : "Home",
      to: data.isAdmin  ? '/admin' : "/staff",
      icon: <RxDashboard/>
    },
    {
      paths: data.isAdmin  ? ['/admin/assign'] : ["/staff/listTask"],
      label: data.isAdmin  ? 'Assign' : "Tasks",
      to: data.isAdmin  ? '/admin/assign' : "/staff/listTask",
      icon: <GrDashboard/>
    },
    {
      paths: ["/profile"],
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

  const pathName = (location.pathname)
    
  const isActive = (paths: string[]) => {
    const isActivePath = paths.includes(pathName)
    return isActivePath
  }

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
      <li key={menuItem.to}>
        <Link 
        to={menuItem.to}
        className={cx({
          'h-[55px] flex justify-center items-center my-[25px]': true,
            'w-full': !isCollapsed,
            'w-[59px]': isCollapsed,
            "hover:before:content-[''] hover:before:w-[10px] ": true,
            'hove] hover:before:h-[55px] hover:bg-[#C9EBF3]': true,
            'hover:before:relative  hover:rounded-r-[5px]': true,
            "active:text-red-600 visited:text-red-800": true,
            "hover:bg-[#c9ebf3] bg-[#9bd6e3]": isActive(menuItem.paths)
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
    <aside className={cx("hidden lg:block overflow-y-hidden min-h-screen sm:block top-0 left-0 bottom-0 text-center bg-[#8996d7] border-r-[2px] border-[#8879e6] pt-[40px] px-[15px] z-10", {
      "w-[50px]": isCollapsed,
      "w-[240px]": !isCollapsed
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