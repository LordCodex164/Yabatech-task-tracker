import React from 'react'
import { StaffMember } from './Assign';


interface AssignFormProps {
    close: () => void;
    staff: StaffMember;
}

const AssignForm = ({close}: AssignFormProps) => {

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

          <div className='w-full'>
          
          <form className=''>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Name
                </label>
                <div className='flex flex-col'>
                 <input type='name' className='focus:outline-none'/>   
                </div>
             </div>
             <div className=''>
                <label htmlFor="name">
                  Description
                </label>
                <div className='flex flex-col'>
                 <input type='name' className='focus:outline-none'/>   
                </div>
             </div>
             <div className='flex flex-col'>
                <label htmlFor="name">
                    Priority
                </label>
                <div className='flex flex-col'>
                   
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

             <button className='text-center flex my-[15px] justify-center w-full max-w-[250px] hover:ring-blue-900 bg-blue-400 hover:bg-blue-600 py-[10px] rounded-md  mx-auto '>
                save
             </button>
          </form>
        
        </div> 
         
       </div>
    </div>
    </>
    
  )
}

export default AssignForm