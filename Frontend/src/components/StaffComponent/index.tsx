import React, { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthDataProps, UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendStatsCard } from '../common/TrendCard';
import { getUserInfo } from '../../backend/User';
import { TailSpin } from 'react-loader-spinner';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StaffMember {
  name: string;
  email: string;
  tasks: tasksProps[] | []
}

interface tasksProps {
  id:number,
  name: string,
  status: "not started" | "in progress" | "completed",
  timeStarted?: Date;
  deadline?: Date;
}


const StaffComponent = () => {

  const [admin, setAdmin] = useState<AuthDataProps>()
  const [data, setData] = useState<StaffMember[] | any[]>([])
  const [assignedUsers, setAssignedUsers] = useState<any[]>([])
  const [unAssignedUsers, setUnAssignedUsers] = useState<any[]>([])
  const[isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [userTasks, setUserTasks] = useState([])
  
  const {userData} = UseGlobalAuth()

  useEffect(() => {
  
   const handleGetUserInfo = async() => {
    const data = await getUserInfo()
    setEmail(data.email)
    setUsername(data.username)
  }
  handleGetUserInfo()
  },[])

  useEffect(() => {
    const handleGetUserInfo = async() => {
      setIsLoading(true)
      try {
        const data = await getUserInfo()
      setUserTasks(data.tasks)
      let finishedUsers:any[] = []
      let unAssignedUsers:any[] = []
      for(let i=0; i < data.length; i++) {
        if(data[i].tasks.length > 0) { 
          finishedUsers.push(data[i])
        }
        else if(data[i].tasks.length <= 0){
          unAssignedUsers.push(data[i])
        }
       } 
       setAssignedUsers(finishedUsers)
       setUnAssignedUsers(unAssignedUsers)
       setIsLoading(false)
      } catch (error:any) {
         console.log(error)
         throw new Error(error)
      }
      
    }
    handleGetUserInfo()
  },[])

  //
  
  // const ddata = {
  //   labels: ["finished", "in progress", "not started"],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [8, 5, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //       ],
  //       borderWidth: 2,
  //     },
  //   ],
  // };


  //


  if(!userData || userData.isAdmin) {
    return <Navigate to={"/auth"}/>
   }

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
    
     <p  className='text-right pt-[10px] pr-[30px]'>Welcome Staff <span className='font-bold '>{username}</span> </p> 
     
      <div className='px-[20px] pt-[10px]'>
        <p>You currently  don't have any avaliable reports</p>
      </div>

    <div className='mx-[20px]'>
      <TrendStatsCard
     title="Number of Your Tasks"
     trendIcon={''}
     amount={userTasks.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
     <hr className='xl:ml-[-1em] border-[2px] bg-[#000] '/> 
     <TrendStatsCard
     title="Number Of Your Completed Tasks"
     trendIcon={''}
     amount={assignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
      <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/>  
     <TrendStatsCard
     title="Number Of Your Tasks in Progress"
     trendIcon={''}
     amount={unAssignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
       <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/> 
       <TrendStatsCard
     title="Number Of Your Uncompleted Tasks"
     trendIcon={''}
     amount={unAssignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />

     

    </div>
    </div>
    }
    
    </>
    
     
  )
}

export default StaffComponent