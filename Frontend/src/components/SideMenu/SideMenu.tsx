import React, {useEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import cx from "classnames"


const SideMenu = ({admin}:any) => {

  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigate = useNavigate()

  const menuItems = [
    {
      paths: ['/dashboard'],
      label: 'Dashboard',
      to: '/admin',
    },
    {
      paths: admin ? ['/Assign Tasks'] : ["View Tasks"],
      label: 'Assign Tasks',
      to: '6/admin',
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

  const handleSignOut = () => {
     console.log("testing")
    localStorage.clear()
  }

  const renderMenuItem = (menuItem: any) => {
    if(menuItem.label === "Logout" ) {
      return (
      <li>
       <Link to={"/auth"}
        onClick={handleSignOut}
        className={cx({
          'h-[55px] flex justify-center items-center my-[30px]': true,
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
            <div className='text-[#000] text-center '> 
               {menuItem.label}
            </div>
            }
           </div>
        </Link>
      </li>
      )
      
    }
    return (
      <li>
        <Link to={menuItem.to}
        className={cx({
          'h-[55px] flex justify-center items-center my-[30px]': true,
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
    <aside className={cx("relative bg-[#ebd6d1]", {
      "w-[50px]": isCollapsed,
      "w-[180px]": !isCollapsed
    })}>
       <nav className=''>
           <ul className=''>
            {menuItems.map((item) => renderMenuItem(item))}
           </ul>
       </nav>

       
    </aside>
  )
}

export default SideMenu