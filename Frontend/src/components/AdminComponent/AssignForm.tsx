 import {useState} from 'react'
import DropDownComponent from '../common/Dropdown';
import { selectedValues } from '../../constants';
import { InputComponent } from '../common/InputComponent';
import { createTasks, } from '../../backend/Task';
import { useStaffStore } from '../../state/useStaffStore';
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal"
interface AssignFormProps {
    close: () => void;
    staffId: number | undefined;
    username: string | undefined;
    email: string
    open: boolean;
}

const AssignForm = ({close, username, email, open}: AssignFormProps) => {
   
    const[selected, setSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState("low")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPrority] = useState("")
    const [deadline, setDeadline] = useState<string | undefined>(new Date().toISOString().substring(0, 10))
    const [isLoading, setIsLoading] = useState(false)

    const {userData} = UseGlobalAuth()

    const navigate = useNavigate()

    const {getAllStaffs} = useStaffStore( ( state ) =>  ( {
      staffs: state.staffs,
      getAllStaffs: state.getAllStaffs,
    } ))

    const handleCreateForm = async (taskName:string, description:string, deadLine:string) => {
       setTimeout(() => {
        setIsLoading(true)
       }, 3000) 

       const taskData = {
        taskName,
        description,
        assignedUser: email,
        assignedBy: userData.email,
        priority: selectedValue,
        deadLine: deadLine,
        taskStatus: "not started"
       }
       try {
       const data = await createTasks(taskData)
       navigate("/admin")
       getAllStaffs()
       setIsLoading(false)
       } catch (error) {
         console.log(error)
         setIsLoading(false)
       }
        
         close()
    }

    const handleCreateDealine = (e:any) => {
      setDeadline(e.target.value)
    }

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // padding: " 1.5rem",
        // maxHeight: "calc(100vh - 100px)",
        // overflow: "auto",
        // WebkitOverflowScrolling: "touch",
        transform: 'translate(-50%, -50%)',
        width: '600px',
        
        height: "671px",
        borderRadius: '10px',
        border: '0.01px solid #888',

      },
      overlay: {
        zIndex: '90',
        backgroundColor: 'rgba(6, 24, 2, 0.55)',
      },
      
    }
  

  return (
    <>
   <Modal style={customStyles} isOpen={open} className={"newratemodal"}>
     <div className='pt-[28px] px-[15px]'>
     <span className='cursor w-full flex justify-end cursor-pointer group' onClick={close}>
            <svg className="w-3 h-3 group-hover:text-white:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </span>
         <h2>Assign a Task to this Staff</h2>

          <div className='w-full mt-[20px]'>
          
          <form className=''>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Name
                </label>
                <div className='flex flex-col'>
                  <InputComponent
                    name="name"
                    value={name}
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded pl-4  mb-[16px] w-full"                    type="text"
                    placeholder=""
                    handleChange={(e) => setName(e.target.value)}
                    // value={formData.email}
                  />                
                  </div>
             </div>
             <div className=''>
                <label htmlFor="name">
                  Description
                </label>
                <div className='flex flex-col'>
                <InputComponent
                    name="e"
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded pl-4  mb-[16px] w-full"                    
                    type="text"
                    value={description}
                    placeholder=""
                    handleChange={(e) => setDescription(e.target.value)}
                  />                
                  </div>
             </div>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Priority
                </label>
                <div className='flex flex-col overflow-x-hidden'>
                    <DropDownComponent selected={selected} setSelected={setSelected} selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={selectedValues} />
                </div>
             </div>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Deadline 
                </label>
                <div className='flex flex-col'>
                <InputComponent
                    name="deadline"
                    type="date"
                    value={deadline}
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded pl-4   mb-[16px] w-full"
                    placeholder="yabatech@uset.com"
                    handleChange={handleCreateDealine}
                    // value={formData.email}
                    restrictPreviousDates
                  />   
                </div>
             </div>

             <button type='button' onClick={() => handleCreateForm(name, description, deadline as unknown as string)} className='text-center flex my-[15px] justify-center w-full max-w-[250px] hover:ring-blue-900 hover:bg-[#c9ebf3] bg-[#9bd6e3] hover:text-[#fff] py-[10px] rounded-md  mx-auto '>
                {isLoading ? "Assigning..." : "Assign" }
             </button>
          </form>
        
        </div> 
         
       </div>
   </Modal>
    </>
    
  )
}

export default AssignForm