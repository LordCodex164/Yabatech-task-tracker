import React, {useEffect, useState} from 'react'
import DropDownComponent from '../common/Dropdown';
import { selectedValues } from '../../constants';
import { InputComponent } from '../common/InputComponent';
import { createTasks } from '../../backend/Task';
import { useStaffStore } from '../../state/useStaffStore';

 // Connect to the Socket.io server

interface AssignFormProps {
    close: () => void;
    staffId: number | undefined;
    create: (id:number, name:string, description:string, priority:string, deadline:boolean) => void | any;
    username: string | undefined
}

const AssignForm = ({close, create, staffId, username}: AssignFormProps) => {

    const[selected, setSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState("low")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPrority] = useState("")
    const [deadline, setDeadline] = useState<Date>()
    const [isLoading, setIsLoading] = useState(false)


    const {getAllStaffs} = useStaffStore( ( state ) =>  ( {
      staffs: state.staffs,
      getAllStaffs: state.getAllStaffs,
    } ))

    const handleCreateForm = async (taskName:string, description:string, assignedUser:string, deadLine:string) => {
       setTimeout(() => {
        setIsLoading(true)
       }, 3000) 
       const taskData = {
        taskName,
        description,
        assignedUser,
        deadLine,
        taskStatus: "not started"
       }
       try {
        const data = await createTasks(taskData)
        console.log(data)
        await getAllStaffs()
       } catch (error) {
         console.log(error)
       }
         
        // setIsLoading(false)
         close()
    }


  return (
    <>
    <div className='fixed right-0 top-0 bottom-0 shadow-transparent bg-blue-300 px-5 py-10 min-w-[450px] animate-slide-in-right translate-x-[6px] before:translate-x-[-66px] duration-150 transition-transform after:translate-x-[66px]'>
       {/* let create the menu */}
       <div className='flex gap-[10px] items-center'>


        <span className='cursor w-full flex justify-end cursor-pointer group' onClick={close}>
            <svg className="w-3 h-3 group-hover:text-white:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </span>

       </div>

       <div className='py-4 overflow-y-auto'>
         
         <h2>Assign a Task For this Staff</h2>

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
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    type="text"
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
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    
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
                <div className='flex flex-col'>
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
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                    placeholder="yabatech@uset.com"
                    // value={formData.email}
                    restrictPreviousDates
                  />   
                </div>
             </div>

             <button type='button' onClick={() => handleCreateForm(name, description, username as string, "high")} className='text-center flex my-[15px] justify-center w-full max-w-[250px] hover:ring-blue-900 bg-blue-400 hover:bg-blue-600 py-[10px] rounded-md  mx-auto '>
                {isLoading ? "saving" : "Assign" }
             </button>
          </form>
        
        </div> 
         
       </div>
    </div>
    </>
    
  )
}

export default AssignForm