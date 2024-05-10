import { useEffect, useState } from 'react'
import { getSpecificTask, deleteTask } from '../../backend/Task'
import { userType } from '../../state/useStaffStore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ViewTaskAdmin = ({staffId, specificStaff, close, open}: any) => {

    const [isLoading, setIsloading] = useState<boolean>(false)
    const [staffData, setStaffData] = useState<userType>()
    const[isDeleting, setIsDeleting] = useState(false)

    interface tasksProps {
      _id?:number,
      taskName: string,
      taskStatus: "not started" | "in progress" | "completed",
      timeStarted?: Date;
      deadLine?: Date;
      assignedUser: string;
      description: string;
    }

    const navigate = useNavigate()

    const handleDeleteTask = async(id:number) => {
      console.log(id)
      setIsDeleting(true)
      try {
        const data = await deleteTask(id)
        toast.success("task deleted successfully")
        navigate("/admin")
      } catch (error) {
         console.log(error)
      }
    }

    console.log(specificStaff)

  return (
    <div>
        {isLoading ? <>
          
        </>:
        <>
        
        <div className='min-h-screen fixed right-0 top-0 bottom-0 shadow-transparent bg-[#6183cd] px-5 py-10 z-50 min-w-[300px] md:min-w-[450px] animate-slide-in-right translate-x-[6px] before:translate-x-[-66px] duration-150 transition-transform after:translate-x-[66px]'>
        <span className='cursor w-full flex justify-end cursor-pointer group' onClick={close}>
            <svg className="w-3 h-3 group-hover:text-white:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </span>
           <p className='text-[20px] font-bold mt-[20px]'>Staff Tasks</p>
           <ul className='flex flex-col gap-[50px] mt-[20px]'>
                {specificStaff.tasks.map((item:tasksProps) => (
                    <li className='flex flex-row items-center justify-between'>
                      <span>{item.taskName}</span>
                      <span><button onClick={() => handleDeleteTask(item._id as number)}  className='bg-red-500 px-[30px] py-[16px]'>Delete</button></span>
                    </li>
                ))}
              </ul>
             <button onClick={() => open(specificStaff.fullName, specificStaff._id)} className='text-center w-full mt-[30px] mx-auto py-[21px] border border-[#000] '>Add More Tasks</button> 
          </div>
        </>}
    </div>
  )
}

export default ViewTaskAdmin