import React, { useState } from 'react'
import { updateTask } from '../../backend/Task'
import DropDownComponent from '../common/Dropdown'
import { selectedTaskValues } from '../../constants'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const EditTaskForm = ({id}: {id:number}) => {

  const [isLoading, setIsloading] = useState(false)

  const[taskSelected, setTaskSelected] = useState(false)
  const [selectedTaskValue, setSelectedTaskValue] = useState({taskStatus: "not started"})

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsloading(true)

    try {
      await updateTask(id, selectedTaskValue)
      toast.success("you have successfully updated your task")
      navigate("/staff/listTask")
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
    }
  }


  return (
    <div className='border px-[30px] border-[#000] bg-[#fff] flex flex-col text-center items-center min-h-[300px]'>
        <form onSubmit={handleSubmit} action="">
          <p className='pl-[20px] mb-[40px] pt-[35px]'>Update Task</p>
          
          <DropDownComponent selected={taskSelected} setSelected={setTaskSelected} selectedValue={selectedTaskValue.taskStatus} setSelectedValue={setSelectedTaskValue} options={selectedTaskValues}/>

         <button className='bg-[#6a70c1] px-[10px] py-[10px] rounded-sm shadow-md hover:text-white hover:bg-[#67c3d3]'>{isLoading ? "Saving": "Save"}</button>
        </form>
    </div>
  )
}

export default EditTaskForm