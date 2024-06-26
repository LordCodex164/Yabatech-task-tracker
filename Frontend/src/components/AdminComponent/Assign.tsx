import  {useEffect, useState} from 'react'
import AssignForm from './AssignForm';
import { useStaffStore, userType } from '../../state/useStaffStore';
import ViewTaskAdmin from './ViewTaskAdmin';
import { TailSpin } from 'react-loader-spinner';

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
  
const Assign = () => {

 const [isSideAssignForm, setIsSideAssignForm] = useState(false)
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
   const handleGetAllTasks = async () => {
    setIsLoading(true)
    try {
      const data = await getAllStaffs()
      let filteredStaffs = []
      for(let i = 0; i < data.length; i++) {
      staffs[i]
      if(data[i].isAdmin == false) {
      filteredStaffs.push(staffs[i])
      }
      }
     setStaffsState(filteredStaffs)
     setIsLoading(false)
    } catch (error:any) {
      setIsLoading(false)
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
    console.log(email)
  }

  const openViewForm = (id:number) => {
    setStaffId(id)
    setShowViewForm(true)
    const specificiedStaff = staffsState.find((item:any) => item._id === id)
    setSpecificStaffState(specificiedStaff)
  }

  const closeViewForm = () => {
    setShowViewForm(false)
  }

  const closeForm = () => {
    setIsSideAssignForm(false)
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
    /> :

    <div className='p-[20px] md:p-[30px] dashboard-content-scroll'>
      <div className='lg:pt-[40px] pt-[20px] bg-[#b5c9eb] shadow-md h-full rounded-[10px] min-h-[50em]'>
        <span className='pl-[30px] lg:pl-[50px] font-bold text-[30px]'>List of Staffs</span>
        <ul className='flex flex-col'>
          {staffsState.map((item) => (
          <div key={item?._id} className='mx-[20px] border-[2px] border-[#8996d7] rounded-[9px] my-[20px] p-[20px]'>
            <li className='flex my-[5px] flex-col gap-[15px] md:gap-0 md:flex-row  items-start justify-between'>
             <div className='flex flex-col gap-[15px] font-light '>
              <p>Name: {item?.fullName}</p>  
              <p>Email: {item?.email}</p>
              <p>Staff Id: {item.uniqueId}</p>
             </div>
           
             {item?.tasks.length > 0 ?
            <button data-drawer-target="drawer-navigation" className='text-white hover:bg-[#c9ebf3] bg-[#9bd6e3] px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openViewForm(item._id)}> View Tasks </button> :
            <button data-drawer-target="drawer-navigation" className='text-white hover:bg-[#c9ebf3] bg-[#9bd6e3] px-5 py-3 rounded-[12px] focus:ring-[5px]' onClick={() =>openForm(item._id, item.username, item?.email)}>Assign</button>
            }

          </li>
          

          
          </div>
        ))}
        </ul>
        {isSideAssignForm && <AssignForm email={staffemail} open={isSideAssignForm} staffId={staffId} username={staffName}  close={closeForm}/> }
       {showViewForm && <ViewTaskAdmin open={openForm} close={closeViewForm} specificStaff={specificStaffState} staffId={staffId} /> }
    </div> 
    </div>
  
    }
    
    </>
    
  )
}

export default Assign 