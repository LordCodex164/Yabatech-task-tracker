import React, {useEffect, useState} from 'react'
import AssignForm from './AssignForm';
import { useStaffStore, userType } from '../../state/useStaffStore';
import ViewTaskAdmin from './ViewTaskAdmin';


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
    deadline?: Date;
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
 const [staffName, setStaffName] = useState<string>()
 const [staffsState, setStaffsState] = useState<userType[]>([])
 const [showViewForm, setShowViewForm] = useState(false)
 const [specificStaffState, setSpecificStaffState] = useState<userType>()
 const [staffemail, setStaffEmail] = useState("")
 const {staffs, getAllStaffs} = useStaffStore( ( state ) =>  ( {
  staffs: state.staffs,
  getAllStaffs: state.getAllStaffs
} ))

 
  useEffect(() => {
   setData(dummyData)

   const handleGetAllTasks = async () => {
    try {
      const data = await getAllStaffs()
      console.log(data)
      let filteredStaffs = []
      for(let i = 0; i < data.length; i++) {
      staffs[i]
      if(data[i].isAdmin == false) {
      filteredStaffs.push(staffs[i])
      }
      }
     setStaffsState(filteredStaffs)
    } catch (error:any) {
      throw new Error(error?.message)
    }
   
   }
   handleGetAllTasks()
   
  }, [])

  const openForm = (id:number, name:string, email:string) => {
    setShowViewForm(false)
    setIsSideAssignForm(true)
    setStaffId(id)
    setStaffName(name)
    setStaffEmail(email)
  }

  const openViewForm = (id:number) => {
    console.log(id)
    setStaffId(id)
    setShowViewForm(true)
    const specificiedStaff = staffsState.find((item:any) => item._id === id)
    console.log(specificiedStaff)
    setSpecificStaffState(specificiedStaff)
    console.log(specificStaffState)
  }

  const closeViewForm = () => {
    setShowViewForm(false)
  }

  const closeForm = () => {
    setIsSideAssignForm(false)
  }

  // const handleCreateTasks = (id:number, name:string, description:string, priority:string, deadLine:boolean) => {
  //   let task = {
  //     name, 
  //     description,
  //     priority,
  //     deadLine
  //    }
  //  const updatedData = data.map((item) => item.id == id ? {...item, tasks: [...item.tasks, task]} : item )
  //  setData(updatedData)
  // }


  return (
    <div className='px-[40px] py-[40px]'>
      <div className='lg:px-[40px] pt-[20px] bg-[#b5c9eb] h-full min-h-[50em]'>
        <span className='pl-[50px] font-bold text-[30px]'>List of Staffs</span>
        <ul className='flex flex-col'>
          {staffsState.map((item) => (
          <div key={item?._id}>
            <li className='flex my-[5px] flex-row items-start justify-between px-[50px]'>
             <div className='flex flex-col'>
              <p>{item?.fullName}</p>  
              <p>{item?.email}</p>
             </div>
           
             {item?.tasks.length > 0 ?
            <button data-drawer-target="drawer-navigation" className='text-white bg-blue-700 hover:bg-blue-900 px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openViewForm(item._id)}> View Tasks </button> :
            <button data-drawer-target="drawer-navigation" className='text-white bg-blue-700 hover:bg-blue-900 px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openForm(item._id, item.username, item.email)}>Assign</button>
            }

          </li>
          {isSideAssignForm && <AssignForm email={staffemail}  staffId={staffId} username={staffName}  close={closeForm}/> }

          
          </div>
        ))}
        </ul>
       {showViewForm && <ViewTaskAdmin open={openForm} close={closeViewForm} specificStaff={specificStaffState} staffId={staffId} /> }
    </div> 
    </div>
  )
}

export default Assign 