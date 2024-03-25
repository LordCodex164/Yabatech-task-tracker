import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'

const Register = () => {


  const {registerAdmin, registerStaff} = UseGlobalAuth()

  const[userName, setUserName] = useState("")
  const[name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

 
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <span>Task-Tracker App</span>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6 success px-[30px] py-[20px] border-[#cbcbc7] border-[1px]" >

        <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Username</label>
            <div className="mt-2">
              <input id="name" name="name" type='name' value={userName} onChange={(e) => setUserName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

         <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Name</label>
            <div className="mt-2">
              <input id="name" name="name" type='name' value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-[#000]">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password"  name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-blue-500 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div className='flex flex-col gap-[20px]'>
            <button onClick={() => registerAdmin(userName, name, email, password)} type='button' className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register as an admin</button>
            <button onClick={() => registerStaff(userName, name, email, password)} type="submit" className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register as a staff</button>
          </div>
          
        </form>
      </div>

</div>
  )
}

export default Register