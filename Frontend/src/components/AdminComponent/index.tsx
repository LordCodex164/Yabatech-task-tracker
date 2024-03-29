import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthDataProps, UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TrendStatsCard } from '../common/TrendCard';

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

export const dummyData: StaffMember[] = [
  {
    name: "user1",
    email: "adenirandaniel565@gmail.com",
    tasks: [
      {
        id: 1,
        name: "code",
        status: "not started",
        timeStarted: new Date(),
        deadline: new Date()
       
      },
      {
        id: 1,
        name: "code",
        status: "in progress",
        timeStarted: new Date(),
        deadline: new Date()

      },
      {
        id: 3,
        name: "repeat",
        status: "completed",
        timeStarted: new Date(),
        deadline: new Date()
      }
    ]
  },
  {
    name: "user2",
    email: "adenirandaniel565@gmail.com",
    tasks: [
      {
        id: 1,
        name: "code",
        status: "not started",
        timeStarted: new Date(),
        deadline: new Date()
      },
      {
        id: 2,
        name: "code",
        status: "in progress",
        timeStarted: new Date(),
        deadline: new Date()
      },
      {
        id: 3,
        name: "code",
        status: "completed"
      }
    ]
  },
  {
    name: "user3",
    email: "adenirandaniel565@gmail.com",
    tasks: [
      
    ]
  },
  {
    name: "user4",
    email: "adenirandaniel565@gmail.com",
    tasks: []
  }
]

const AdminComponent = () => {

  const [admin, setAdmin] = useState<AuthDataProps>()
  const [data, setData] = useState<StaffMember[] | any[]>([])
  const [assignedUsers, setAssignedUsers] = useState<any[]>([])
  const [unAssignedUsers, setUnAssignedUsers] = useState<any[]>([])
  const {authData, userData} = UseGlobalAuth()


  useEffect(() => {
   setAdmin(authData)
   setData(dummyData)
   let finishedUsers:any[] = []
   let unAssignedUsers:any[] = []
   for(let i=0; i < dummyData.length; i++) {
    if(dummyData[i].tasks.length > 0) { 
      finishedUsers.push(dummyData[i])
    }
    else if(dummyData[i].tasks.length <= 0){
      unAssignedUsers.push(dummyData[i])
    }
   }
   setAssignedUsers(finishedUsers)
   setUnAssignedUsers(unAssignedUsers)
  },[])
  //
  
  const ddata = {
    labels: ["finished", "in progress", "not started"],
    datasets: [
      {
        label: '# of Votes',
        data: [8, 5, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };


console.log(userData)

  
if(!userData || !userData.isAdmin) {
   return <Navigate to={"/auth"}/>
  }

  return (
    <div className='acquisitions h-full'>
    
     <p  className='text-right pt-[10px] pr-[30px]'>Welcome Admin <span className='font-bold '>{userData?.username}</span> </p> 
     
      <div className='px-[20px] pt-[10px]'>
        <p>You currently  don't have any avaliable reports</p>
      </div>
      {/* 
      Get the staff data from the server
      
      render them

      staff 

      -> name
      -> email
      -> tasks
        --> finished 
        --> unfinished
        --> in progress
      
      */}
     
    <div className='mx-[20px]'>
      <TrendStatsCard
     title="Number of Staffs"
     trendIcon={''}
     amount={data.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
     <hr className='xl:ml-[-1em] border-[2px] bg-[#000] '/> 
     <TrendStatsCard
     title="Number Of Tasks Assigned"
     trendIcon={''}
     amount={assignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
      <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/>  
     <TrendStatsCard
     title="Number Of Tasks Unassigned"
     trendIcon={''}
     amount={unAssignedUsers.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
       <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/> 
    </div>
    </div>
     
  )
}

export default AdminComponent