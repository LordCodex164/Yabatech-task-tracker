import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthDataProps, UseGlobalAuth } from '../../AuthProvider/AuthProvider'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


interface tasksProps {
  id:number,
  name: string,
  status: "not started" | "in progresss" | "competed"
}

export const dummyData = [
  {
    name: "user1",
    email: "adenirandaniel565@gmail.com",
    tasks: [
      {
        id: 1,
        name: "code",
        status: "not started",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
       
      },
      {
        id: 1,
        name: "code",
        status: "in progress",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()

      },
      {
        id: 3,
        name: "repeat",
        status: "completed",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
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
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      },
      {
        id: 2,
        name: "code",
        status: "in progress",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
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
      {
        id: 1,
        name: "code",
        status: "not started",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      },
      {
        id: 2,
        name: "code",
        status: "in progress",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      },
      {
        id: 3,
        name: "code",
        status: "completed",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      }
    ]
  },
  {
    name: "user4",
    email: "adenirandaniel565@gmail.com",
    tasks: [
      {
        id: 1,
        name: "code",
        status: "not started",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      },
      {
        id: 2,
        name: "code",
        status: "in progress",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      },
      {
        id: 3,
        name: "code",
        status: "completed",
        timeStarted: new Date().getDate(),
        deadline: new Date().getDate()
      }
    ]
  }
]

const AdminComponent = () => {

  const [admin, setAdmin] = useState<AuthDataProps>()

  const {authData} = UseGlobalAuth()


  useEffect(() => {
   setAdmin(authData)
  },[])
  //
  
  const data = {
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


  //

   
  
if(!authData || authData.role !== "admin") {
   return <Navigate to={"/auth"}/>
  }

  return (
    <div className='acquisitions h-full'>
    
     <p  className='text-right pt-[10px] pr-[30px]'>Welcome Admin <span className='font-bold '>{admin?.name}</span> </p> 
     
      <div className='px-[20px] py-[30px]'>
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
    </div>
  )
}

export default AdminComponent