import React, {useEffect, useState} from 'react'
import { StaffMember } from './Assign';
import DropDownComponent from '../common/Dropdown';
import { selectedValues } from '../../constants';

interface AssignFormProps {
    close: () => void;
    staffId: number | undefined;
    create: (id:number, name:string, description:string, priority:string, deadline:boolean) => void | any
}

const AssignForm = ({close, create, staffId}: AssignFormProps) => {
   
    const[selected, setSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState("low")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPrority] = useState("")
    const [deadline, setDeadline] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateForm = (id:number, name:string, description:string, priority:string, deadline:boolean) => {
       setTimeout(() => {
        setIsLoading(true)
       }, 3000) 
         create(id, name, description, priority, deadline)
        console.log(id)
        // setIsLoading(false)
         close()
    }


  return (
    <>
    <div id='drawer-navigation' className=' fixed right-0 top-0 bottom-0 shadow-transparent bg-blue-300 px-5 py-10 min-w-[450px] animate-slide-in-right translate-x-[6px] before:translate-x-[-66px] duration-150 transition-transform after:translate-x-[66px]'>
       {/* let create the menu */}
       <div className='flex gap-[10px] items-center'>


        <span className='cursor w-full flex justify-end cursor-pointer group' onClick={close}>
            <svg className="w-3 h-3 group-hover:text-white:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </span>

       </div>

       <div className='py-4 overflow-y-auto'>
         
         <h2>Create a Task For this Staff</h2>

          <div className='w-full mt-[20px]'>
          
          <form className=''>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Name
                </label>
                <div className='flex flex-col'>
                 <input onChange={(e) => setName(e.target.value)} value={name} type='name' className='focus:outline-none'/>   
                </div>
             </div>
             <div className=''>
                <label htmlFor="name">
                  Description
                </label>
                <div className='flex flex-col'>
                 <input onChange={(e) => setDescription(e.target.value)} value={description} type='name' className='focus:outline-none'/>   
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
                 <input type='name' className='focus:outline-none'/>   
                </div>
             </div>

             <button type='button' onClick={() => handleCreateForm(staffId as unknown as number, name, description, "high", true)} className='text-center flex my-[15px] justify-center w-full max-w-[250px] hover:ring-blue-900 bg-blue-400 hover:bg-blue-600 py-[10px] rounded-md  mx-auto '>
                {isLoading ? "saving" : "save" }
             </button>
          </form>
        
        </div> 
         
       </div>
    </div>
    </>
    
  )
}

export default AssignForm