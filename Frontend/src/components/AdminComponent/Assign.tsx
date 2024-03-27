import React, {useEffect, useState} from 'react'
import AssignForm from './AssignForm';

export interface StaffMember {
    id: number;
    name: string;
    email: string;
    tasks: tasksProps[] | any
  }
  
  interface tasksProps {
    id:number,
    name: string,
    status: "not started" | "in progress" | "completed",
    priority: "high" | "low",
    timeStarted?: Date;
    deadline?: boolean;
  }
  
  export const dummyData: StaffMember[] = [
    {
      id: 1,
      name: "user1",
      email: "adenirandaniel565@gmail.com",
      tasks: []
    },
    {
      id: 2,
      name: "user2",
      email: "adenirandaniel575@gmail.com",
      tasks: []
    },
    {
      id: 3,
      name: "user3",
      email: "adenirandaniel585@gmail.com",
      tasks: []
    },
    {
      id: 4,
      name: "user4",
      email: "adenirandaniel595@gmail.com",
      tasks: []
    }
  ]
  
const Assign = () => {

 const [isSideAssignForm, setIsSideAssignForm] = useState(false)
 const [data, setData] = useState<StaffMember[] | any[]>([])
 const [isLoading, setIsLoading] = useState(true)
 const [staffId, setStaffId] = useState<number>()
  //fetch all the list of staffs

  //assign them tasks by clicking on each staff

  /*
  const staff = [
    {
      id: 1,
      name,
      tasks: []
    }
  ]

  let tasks = []

  for(key in staff) {
    key.tasks 
  }
  */

  
   

  useEffect(() => {
   setData(dummyData)
  }, [])

  const openForm = (id:number) => {
    setIsSideAssignForm(true)
    console.log(id)
    setStaffId(id)
  }

  const closeForm = () => {
    setIsSideAssignForm(false)
  }

  const handleCreateTasks = (id:number, name:string, description:string, priority:string, deadine:boolean) => {
    let task = {
      name, 
      description,
      priority,
      deadine
     }
   const updatedData = data.map((item) => item.id == id ? {...item, tasks: [...item.tasks, task]} : item )
   setData(updatedData)
  }


  return (
    <div className='px-[40px] py-[40px]'>
      <div className='lg:px-[40px] pt-[20px] bg-[#b5c9eb] h-full min-h-[50em]'>
        <span className='pl-[50px] font-bold text-[30px]'>List of Staffs</span>
        <ul>
          {data.map((item) => (
          <div key={item.id}>
            <li className='flex my-[5px] flex-col lg:flex-row items-start justify-between px-[50px]'>
             <div className='flex flex-col'>
              <p>{item.name}</p>  
              <p>{item.email}</p>
             </div>
            {item.tasks.length > 0 ?
            <button data-drawer-target="drawer-navigation" className='text-white bg-blue-700 hover:bg-blue-900 px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openForm(item.id)}> View Tasks </button> :
            <button data-drawer-target="drawer-navigation" className='text-white bg-blue-700 hover:bg-blue-900 px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openForm(item.id)}>Assign</button>
            }
             
             
          </li>
          {isSideAssignForm && <AssignForm  create={handleCreateTasks} staffId={staffId}  close={closeForm}/> }
          </div>
          
        ))}
        </ul>
       
    </div>
    </div>
  )
}

export default Assign 