import { useEffect, useState } from 'react'
import {UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendStatsCard } from '../common/TrendCard';
import StaffPerformance from '../Performance/StaffPerformance';
import { useStaffStore, userType } from '../../state/useStaffStore';
import { TailSpin } from 'react-loader-spinner';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);


const AdminComponent = () => {
  const [assignedUsers, setAssignedUsers] = useState<any[]>([])
  const [unAssignedUsers, setUnAssignedUsers] = useState<any[]>([])
  const [staffsState, setStaffsState] = useState<userType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {userData} = UseGlobalAuth()

  const {staffs, getAllStaffs} = useStaffStore( ( state ) =>  ( {
    staffs: state.staffs,
    getAllStaffs: state.getAllStaffs,
  } ))

  
  useEffect(() => {
 
    const handleGetAllTasks = async () => {
      setIsLoading(true)
    try {
      const data = await getAllStaffs()
    let filteredStaffs = []
    let finishedUsers:any[] = []
    let unAssignedUsers:any[] = []
    for(let i = 0; i < data.length; i++) {
     staffs[i]
     if(data[i].isAdmin == false) {
       filteredStaffs.push(staffs[i])
       if(data[i].tasks.length > 0) {
        finishedUsers.push(data[i])
       }
       if(data[i].tasks.length <= 0) {
        unAssignedUsers.push(data[i])
       }
     }
    }
    setStaffsState(filteredStaffs)
    setAssignedUsers(finishedUsers)
    setUnAssignedUsers(unAssignedUsers)
    setIsLoading(false)
    } catch (error:any) {
      toast.error(error?.message || error?.response.data)
    }
    
    }
    handleGetAllTasks()
    
   }, [])

  return (
    <> 
    {isLoading ?
     <TailSpin
     visible={true}
     height="80"
     width="80"
     color="#8996d7"
     ariaLabel="tail-spin-loading"
     radius="1"
     wrapperStyle={{}}
     wrapperClass="flex justify-center h-[100vh] items-center"
     />

     :
   
     <div className='acquisitions h-full'>
    
     <p  className='text-right pt-[10px] pr-[30px]'>Hello Admin <span className='font-bold '>{userData?.username}</span> </p> 
     
      {staffsState.length < 1 && <div className='px-[20px] pt-[10px]'>
        <p>You currently  don't have any avaliable reports</p>
      </div>}
     
    <div className='mx-[20px]'>
      <TrendStatsCard
     title="Total Number of Staffs"
     trendIcon={''}
     amount={staffsState.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
     <hr className='xl:ml-[-1em] border-[2px] bg-[#000] '/> 
     <TrendStatsCard
     title="Number Of Staffs Assigned"
     trendIcon={''}
     amount={assignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
      <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/>  
     <TrendStatsCard
     title="Number Of Staffs Unassigned"
     trendIcon={''}
     amount={unAssignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
       <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/> 
     <p className='my-[30px]'>Performance Metrics for Staff/Staffs Assigned Tracks</p>
     {/* Performance metrics for every staff */}
     <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 lg:gap-[30px] xl:gap-[50px]'>
        {assignedUsers.map((item) => (
          <StaffPerformance item={item} />
        ))}
     </div>

    </div>
    </div>    
    }
    </>
   
  )
}

export default AdminComponent