import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendStatsCard } from '../common/TrendCard';
import { getUserInfo } from '../../backend/User';
import { TailSpin } from 'react-loader-spinner';
import {Pie} from "react-chartjs-2"
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend);


interface tasksProps {
  id?:number,
  taskName: string,
  taskStatus: "not started" | "in progress" | "completed",
  timeStarted?: Date;
  deadLine?: Date;
  assignedUser: string;
  description: string;
}


const StaffComponent = () => {

  const[isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState("")
  const [taskCategory, setTaskCategory] = useState({completedTasks: [] as tasksProps[], inProgressTasks: [] as tasksProps[], unFinishedTasks: [] as tasksProps[]})
  const [userTasks, setUserTasks] = useState<any[]>([])
  const[isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    const handleGetUserInfo = async() => {
      setIsLoading(true)
      try {
        const data = await getUserInfo()
      setUserTasks(data.tasks)
      setUsername(data.username)
      setIsAdmin(data.isAdmin)
      let unFinishedTasks:tasksProps[] = []
      let inProgressTasks:tasksProps[] = []
      let completedTasks:tasksProps[] = []

      for(let i= 0; i < data.tasks?.length; i++){
        if(data.tasks[i].taskStatus == "not started"){
          unFinishedTasks.push(data.tasks[i])
        }

        else if(data.tasks[i].taskStatus == "in progress"){
          inProgressTasks.push(data.tasks[i])
        }

        else if(data.tasks[i].taskStatus == "completed"){
          completedTasks.push(data.tasks[i])
        }
      }
      setTaskCategory({completedTasks, unFinishedTasks, inProgressTasks})
       setIsLoading(false)
      } catch (error:any) {
         throw new Error(error)
      }
    }
    handleGetUserInfo()
  },[])

   
  
  const data = {
    labels: ["finished", "in progress", "not started"],
    datasets: [
      {
        label: '# of Task Category',
        data: [taskCategory.completedTasks.length, taskCategory.inProgressTasks.length, taskCategory.unFinishedTasks.length],
        backgroundColor: [
          'rgba(56, 201, 86, 1)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          
        ],
        borderColor: [ 
          'rgba(56, 255, 86, 1)',
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 99, 132, 1)',
         
        ],
        borderWidth: 2,
      },
    ],
  };

if(isAdmin) {
  return (
    <>
   {toast.error("you are not authenticated")}
  <Navigate to={"/auth"}/>
    </>
  )  
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
     
  <div className='acquisitions h-full dashboard-content-scroll'>
    
     <p  className='text-right pt-[10px] pr-[30px] my-[20px]'>Hello Staff <span className='font-bold '>{username}</span> </p> 
     
    {userTasks.length < 1 ?
    
    <div className='px-[20px] pt-[10px]'>
        <p>You currently  don't have any avaliable reports</p>
      </div>

      :

      <div className='mx-[20px] mt-[40px] lg:mt-[60px]'>
      <TrendStatsCard
     title="Number of Your Tasks"
     trendIcon={''}
     amount={userTasks.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
     <hr className='xl:ml-[-1em] border-[2px] bg-[#000] '/> 
     <TrendStatsCard
     title="Number Of Your Unfinished Tasks"
     trendIcon={''}
     amount={taskCategory.unFinishedTasks.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
      <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/>  
     <TrendStatsCard
     title="Number Of Your Tasks in Progress"
     trendIcon={''}
     amount={taskCategory.inProgressTasks.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />
       <hr className='xl:ml-[-1em] bg-[#000] xl:mr-[-1em]'/> 
       <TrendStatsCard
     title="Number Of Your Completed Tasks"
     trendIcon={''}
     amount={taskCategory.completedTasks.length}
     trendtitle="Last 30 days"
     amountClassName={0 ? 'text-red-500' : ''}
     />

   <div className='mt-[20px]'>
       <span>Report Chart for your Tasks</span>
      <Pie className='max-w-[250px] max-h-[310px]' data={data}/>
     </div>
    </div>
  
  
    } 

    
    </div>
    }
    
    
    </>
    
     
  )
}

export default StaffComponent