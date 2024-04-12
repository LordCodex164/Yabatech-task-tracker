import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSpecificTask } from '../../backend/Task'
import toast from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import EditTaskForm from './EditTaskForm'

interface UserTask {
    assignedUser: string,
    createdAt: string
    deadLine: string
    description: string
    taskName: string
    taskStatus: string
    updatedAt: string
}

const ViewTask = () => {

    const [userTask, setUserTask] = useState<UserTask| null>(null)
    const [isLoading, setIsloading] = useState<boolean>(false)
    const[showPrompt, setShowPrompt] = useState(false)

    const {id} = useParams()

    useEffect(() => {
      const handleGetSpecificTask = async () => {
        setIsloading(true)
        try {
            const data = await getSpecificTask(id as unknown as number)
            console.log(data)
            setUserTask(data)
            setIsloading(false)
        } catch (error:any) {
            toast.error(error?.message)
            throw new Error(error?.message)
        }
      }
      handleGetSpecificTask()
      console.log("component rendered")
    }, [])

    
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
   <div className='relative'>
      
      <div className='px-[80px] py-[40px]'>
         <p className='text-[40px] font-extralight mb-[40px]'>Task Details</p>
    
      <div className='flex flex-col gap-[10px] items-start'>
        <h1 className='font-extralight text-[25px]'>Task Name: {userTask?.taskName}</h1>
        <p className='text-[25px] font-extralight'>Status: <span className='text-[25px] font-bold'>{userTask?.taskStatus}</span></p>
      </div>
        

        <div className='flex flex-col mt-[20px] gap-[40px]'>
            <span>You were assigned the task by ....</span>
            <button onClick={() => setShowPrompt(true)} className='bg-[#8996d7] mx-auto py-[10px] px-[10px]'>Click to Update your status</button>
        </div>
      </div>
       

      <div className='absolute min-w-full flex justify-center  top-[70px]'>
        {showPrompt && <EditTaskForm id={id as unknown as number}/>}
      </div>

    </div>
   }
   
   </>
   
  )
}

export default ViewTask