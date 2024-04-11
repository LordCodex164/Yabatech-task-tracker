import {useState, useEffect} from "react"
import { InputComponent } from "../../components/common/InputComponent"
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { getUserInfo } from '../../backend/User';

export interface userType{
  _id: number,
  fullName: string,
  username: string,
  email: string,
  password: string,
  isAdmin: boolean,
  createdAt: string,
  updatedAt: string,
  tasks: []
}


const Profile = () => { 

  const [cookies] = useCookies()
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [userTasks, setUserTasks] = useState<userType | null>(null)

  useEffect(() => {
    const handleGetUserInfo = async() => {
      setIsloading(true)
      try {
        const data = await getUserInfo()
        setUserTasks(data)
        setIsloading(false)
      } catch (error:any) {
         throw new Error(error?.message)
      }
    }
    handleGetUserInfo()
  },[])

  return (
    <div className="bg-[#FFFFFF]">
    <div className="flex flex-col items-start pt-[13px] pl-[20px]">

      <div className="flex flex-col gap-[7px]">
        <h3 className="text-[16px] md:text-[20px] text-[#00000]leading-6 font-semibold">Profile information</h3>
        <p className="text-[12px] md:text-[16px] md:leading-5 font-normal">View your profile information</p>
      </div>
      
      <form className="">
          <div className="flex flex-col mt-[2em]">
            <hr className="border-t-1" />

        
              <div className="flex gap-[5px] placeholder:text-[13.25px] min-h-[48px] mb-[16px] px-[10px] rounded mt-[16px] min-w-full">

                <div className="flex flex-col items-start ">
                  <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                    Full Name
                  </label>
                  <div className="w-full">
                    <InputComponent
                      name="firstName"
                      value={userTasks?.fullName}
                      disabled
                      className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start ">
                  <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                    Username
                  </label>
                  <div className="w-full">
                    <InputComponent
                      name="firstName"
                      value={userTasks?.username}
                      disabled
                      className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>


              </div>      

            <div className="flex gap-[5px] placeholder:text-[13.25px] min-h-[48px] mb-[16px] px-[10px] rounded mt-[16px] min-w-full">
              
              <div className="flex flex-col items-start mt-5">
                <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                  Email
                </label>
                <div className="w-full ">
                  <InputComponent
                    name="email"
                    className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"                    type="text"
                    placeholder="yabatech@uset.com"
                    value={userTasks?.email}
                    disabled
                  />
                </div>
              </div>
              
            </div>

          </div>
        </form>


    </div>
  </div>
  )
}

export default Profile