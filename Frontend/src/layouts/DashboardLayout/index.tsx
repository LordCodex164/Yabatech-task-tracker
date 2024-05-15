import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import TopBar from '../../components/TopBar/TopBar'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider';
import { useEffect } from 'react';


const MainLayout = () => {

 const {userData} = UseGlobalAuth()

  if(!userData){
    return <Navigate to="/auth"/>
  }

  
 
  return (
    <>
    <div className='flex min-h-screen'>
      <SideMenu data={userData}/>
      <div className='w-full flex-1'>
        <TopBar data={userData}/>
        <div id='detail' className=''>
        <Outlet/>
       </div>
      </div>
      
    </div>
    
    </>
  )
}

export default MainLayout 