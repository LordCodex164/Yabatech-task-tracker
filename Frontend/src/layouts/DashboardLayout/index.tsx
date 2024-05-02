import { Navigate, Outlet } from 'react-router-dom'
import SideMenu from '../../components/SideMenu/SideMenu'
import TopBar from '../../components/TopBar/TopBar'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider';


const MainLayout = () => {

 const {userData} = UseGlobalAuth()

  if(!userData){
    return <Navigate to="/auth"/>
  }

  return (
    <>
    <div className='flex overflow-y-hidden w-full'>
      <SideMenu data={userData}/>
      <div className='w-full'>
        <TopBar data={userData}/>
        <div id='detail'>
        <Outlet/>
       </div>
      </div>
      
    </div>
    
    </>
  )
}

export default MainLayout 