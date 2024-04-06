import React, { useEffect, useState } from 'react'
import { userType } from '../../state/useStaffStore'
import {Pie} from "react-chartjs-2"

const StaffPerformance = ({item}: {item:userType}) => {
  
  const [taskCategory, setTaskCategory] = useState({completedTasks: [] as tasksProps[], inProgressTasks: [] as tasksProps[], unFinishedTasks: [] as tasksProps[]})

  interface tasksProps {
    id?:number,
    taskName: string,
    taskStatus: "not started" | "in progress" | "completed",
    timeStarted?: Date;
    deadLine?: Date;
    assignedUser: string;
    description: string;
  }

  useEffect(() => {
    let unFinishedTasks:tasksProps[] = []
    let inProgressTasks:tasksProps[] = []
    let completedTasks:tasksProps[] = []

    for(let i= 0; i < item.tasks?.length; i++){
      if(item.tasks[i].taskStatus == "not started"){
        unFinishedTasks.push(item.tasks[i])
      }

      else if(item.tasks[i].taskStatus == "in progress"){
        inProgressTasks.push(item.tasks[i])
      }

      else if(item.tasks[i].taskStatus == "completed"){
        completedTasks.push(item.tasks[i])
      }
    }
    setTaskCategory({completedTasks, unFinishedTasks, inProgressTasks})
  }, [])

  const data = {
    labels: ["finished", "in progress", "not started"],
    datasets: [
      {
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
  return (
    <div className='flex flex-col items-center border-[1px] border-[#8996d7]'>
     <Pie className='max-w-[250px] max-h-[310px]' data={data}/>
      <p>Staff Name: {item.fullName}</p>
    </div>
  )
}

export default StaffPerformance