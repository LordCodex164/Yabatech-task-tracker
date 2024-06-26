import React, { useState } from 'react'
import { updateTask } from '../../backend/Task'
import DropDownComponent from '../common/Dropdown'
import { selectedTaskValues } from '../../constants'
import {useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const EditTaskForm = ({id}: {id:number}) => {

  const [isLoading, setIsloading] = useState(false)

  const[taskSelected, setTaskSelected] = useState(false)
  const [selectedTaskValue, setSelectedTaskValue] = useState("not started")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsloading(true)

    try {
      const data = {
        taskStatus: selectedTaskValue
      }
      await updateTask(id, data)
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
          
          <DropDownComponent selected={taskSelected} setSelected={setTaskSelected} selectedValue={selectedTaskValue} setSelectedValue={setSelectedTaskValue} options={selectedTaskValues}/>

         <button className='hover:bg-[#c9ebf3] bg-[#9bd6e3] px-[10px] py-[10px] rounded-sm shadow-md hover:text-white'>{isLoading ? "Saving": "Save"}</button>
        </form>
    </div>
  )
}

export default EditTaskForm