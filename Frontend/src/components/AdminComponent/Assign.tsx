import React, {useState} from 'react'
import AssignForm from './AssignForm';

export interface StaffMember {
    id: number;
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
  
const Assign = () => {

 const [isSideAssignForm, setIsSideAssignForm] = useState(false)

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

  
   const dummyData: StaffMember[] = [
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

  const openForm = () => {
    setIsSideAssignForm(true)
  }

  const closeForm = () => {
    setIsSideAssignForm(false)
  }


  return (
    <div className=''>
        <span className='pl-[50px]'>List of Staffs</span>
        <ul>
          {dummyData.map((item) => (
          
          <li className='flex my-[5px] justify-between px-[50px]' key={item.name}>
             <div className='flex flex-col'>
              <p>{item.name}</p>  
              <p>{item.email}</p>
             </div>
             <button data-drawer-target="drawer-navigation" className='text-white bg-blue-700 hover:bg-blue-900 px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={openForm}>Assign</button>
             {isSideAssignForm && <AssignForm staff={item}  close={closeForm}/> }
          </li>
        ))}
        </ul>
       
    </div>
  )
}

export default Assign 