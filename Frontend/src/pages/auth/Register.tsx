import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { UseGlobalAuth } from '../../AuthProvider/AuthProvider'

const Register = () => {


  const {registerAdmin, registerStaff} = UseGlobalAuth()

  const[userName, setUserName] = useState("")
  const[name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [generatedNumber, setGeneratedNumber] = useState<string>("")

  const generateNumber = () => {

    const num1 = Math.floor(Math.random() * 1000)
    setGeneratedNumber("YCT" + num1)
    
  }



  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <span className='fnt font-medium text-[15px]'>Task-Tracker App</span>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6 success px-[30px] py-[20px] border-[#cbcbc7] border-[1px]" >

        <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Username</label>
            <div className="mt-2">
              <input id="name" name="username" type='username' value={userName} onChange={(e) => setUserName(e.target.value)} className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

         <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Name</label>
            <div className="mt-2">
              <input id="name" name="name" type='name' value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <label className="block text-sm text-left font-medium leading-6 text-[#000]">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email"  required className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
 
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-[#000]">Password</label>
            </div>
            <div className="mt-2">
              <input id="password"  name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full pl-3 rounded-md border-0 py-1.5 text-blue-500 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-[#000]">Unqiue ID</label>
            </div>
            <div className="mt-2">
              <div className='w-full flex justify-end'>
                <button onClick={generateNumber} id="uniqueId"  name="uniqueId" type='button' className="style text-blue-600 text-[12px]">
                Generate Unique Id
              </button>
              </div>
              
              <input disabled value={generatedNumber} name='uniqueId' id='uniqueId' className="block w-full rounded-md border-0 py-1 text-blue-500 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-[10px] focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          
          <div className='flex flex-col gap-[20px]'>
            <button onClick={() => registerAdmin(userName, name, email, password, true, generatedNumber)} type='button' className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register as an admin</button>
            <button onClick={() => registerStaff(userName, name, email, password, false, generatedNumber)} type="button" className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register as a staff</button>
          </div>

          <div className="text-sm flex flex-col items-end justify-end">
                <p className="font-semibold text-black">Already have an account ?</p>
               <Link to={"/auth"}  className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
              </div>
          
        </form>
      </div>

</div>
  )
}

export default Register