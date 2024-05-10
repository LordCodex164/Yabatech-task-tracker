import  {useState} from 'react'
import { InputComponent } from '../common/InputComponent';
import { updateSpecificUser } from '../../backend/User';
import { userType } from '../../state/useStaffStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({userTasks, close}: {userTasks: userType, close: () => void}) => {

    const [fullName, setFullName] = useState(userTasks.fullName)
    const [username, setUsername] = useState(userTasks.username)
    const [email, setEmail] = useState(userTasks.email)
    const [isEditing, setIsEditing] = useState(false)

    const navigate = useNavigate()

    const handleUpdateTask = async (fullName:string, username:string, email:string) => {
       setIsEditing(true)
       const data = {
        fullName,
        username,
        email
       }
       try {
        await updateSpecificUser(userTasks._id, data)
        setIsEditing(false)
        toast.success("your profile has been updated successfully")
         if(userTasks.isAdmin){
          navigate("/admin")
         }
         else{
          navigate("/staff")
         }
       } catch (error:any) {
         setIsEditing(false)
         throw new Error(error?.message)
       }
    }

  return (
    <div className='fixed right-0 top-0 bottom-0 shadow-transparent bg-[#8996d7] px-5 py-10 min-w-[320px] md:min-w-[450px] animate-slide-in-right translate-x-[6px] before:translate-x-[-66px] duration-150 transition-transform after:translate-x-[66px]'>
    {/* let create the menu */}
    <div className='flex gap-[10px] items-center'>


     <span className='cursor w-full flex justify-end cursor-pointer group' onClick={close}>
         <svg className="w-3 h-3 group-hover:text-white:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
         </svg>
     </span>

    </div>

    <div className='py-4 overflow-y-auto'>
      
      <h2>Edit Profile</h2>

       <div className='w-full mt-[20px]'>
       
       <form className=''>
          <div className='flex flex-col'>
             <label htmlFor="name">
                 Full Name
             </label>
             <div className='flex flex-col'>
               <InputComponent
                 name="name"
                 value={fullName}
                 className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    type="text"
                 placeholder=""
                 handleChange={(e) => setFullName(e.target.value)}
                 // value={formData.email}
               />                
               </div>
          </div>
          <div className=''>
             <label htmlFor="name">
               Username
             </label>
             <div className='flex flex-col'>
             <InputComponent
                 name="e"
                 className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    
                 type="text"
                 value={username}
                 placeholder=""
                 handleChange={(e) => setUsername(e.target.value)}
               />                
               </div>
          </div>
          <div className='flex flex-col'>
             <label htmlFor="name">
                 Email
             </label>
             <div className='flex flex-col'>
              <InputComponent
                 name="e"
                 className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    
                 type="text"
                 value={email}
                 placeholder=""
                 handleChange={(e) => setEmail(e.target.value)}
               />  
             </div>
          </div>
             
            <div className='w-full flex justify-center'>
                <button type='button' onClick={() => handleUpdateTask(fullName, username, email)} className='mx-auto px-[20px] py-[10px] max-w-[420px] hover:bg-[#c9ebf3] bg-[#9bd6e3]'>
                  {isEditing ? "Editing" : "Edit"}
                </button>
            </div>
         
       </form>
     
     </div> 
      
    </div>
 </div>
  )
}

export default EditProfile