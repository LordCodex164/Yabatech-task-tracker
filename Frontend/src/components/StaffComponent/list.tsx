import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../backend/User';
import { TailSpin } from 'react-loader-spinner'
import cx from "classnames"

const view = () => {
  const [userTasks, setUserTasks] = useState<any[]>([])
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [taskStatus, setTaskStatus] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetUserInfo = async() => {
      setIsloading(true)
      try {
        const data = await getUserInfo()
        setUserTasks(data.tasks)
        setIsloading(false)
      } catch (error) {
         console.log(error)
      }
      
    }
    handleGetUserInfo()
  },[])

  const handleViewTask = (id:number) => {
    navigate(`/staff/viewTask/${id}`)
  }

  const switchColor = (status:string) => {
    switch (status) {
      case "not started":
        "text-red-500"
        break;
        case "in progress":
          "text-yellow-500"
          break;
          case "completed":
          "text-green-500"
            break;
      default:
        "text-red-500"
        break;
    }
  }
  
  const bgClassName = (status: string) => {
    return cx({
      ["text-red-600"]: status === "not started",
      ["text-yellow-100"]: status === "in progress",
      ["text-green-100"]: status === "not completed",
    });
  };



  const tasksTab = ["not started", "in progress", "completed"]

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
    <div className='bg-[#fff] px-[40px] py-[40px] '>

      <div className='flex flex-row items-center gap-[40px] xl:gap-[60px]'>
        <button onClick={() => setTaskStatus("all")} className={`px-[14px] py-[12px] rounded-full ${taskStatus == "all" &&  "bg-[#fcd4d4]"} shadow-2xl`}> 
          All Tasks
          </button>


         <div className='grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:flex md:flex-row'>
            {tasksTab.map((item) => (
              <button onClick={() => setTaskStatus(item)} className={`px-[14px] py-[12px] ${taskStatus == item && "bg-[#fcd4d4] " }  cursor-pointer rounded-full  shadow-sm hover:shadow-2xl`}>{item}</button>
            ))}
         </div>
      </div>

      {userTasks ? userTasks.filter((item) => taskStatus === "all" || item?.taskStatus === taskStatus ).map((item:any, index:any) => (
        <div key={index} className='flex justify-between px-[30px] shadow-md bg-[#aac8e6] my-[25px] items-center py-[45px] rounded-md'>
        <div className='flex flex-col'>
            <p>{item.taskName}</p>
            <p className='text-[20px] font-bold'>Status: <span className={`${bgClassName(item.taskStatus)}`}>{item.taskStatus}</span></p>
        </div>
        <span className='cursor cursor-pointer bg-[#a0ebcc] hover:bg-[#53e381] hover:text-white whitespace-nowrap px-[10px] rounded-md py-[10px]' onClick={() => handleViewTask(item._id)}>View Task</span>
    </div>
    )) : (
    <span>You don't have Tasks</span>
     )}
    </div>
    }
    </>
    
  )
}

export default view