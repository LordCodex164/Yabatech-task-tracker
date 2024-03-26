import {} from "react"
import { InputComponent } from "../../components/common/InputComponent"

const Profile = () => { 
     
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
                    First Name
                  </label>
                  <div className="w-full">
                    <InputComponent
                      name="firstName"
                      value={""}
                      disabled
                      className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start ">
                  <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                    Last Name
                  </label>
                  <div className="w-full">
                    <InputComponent
                      name="lastName"
                      className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                      type="text"
                      placeholder=""
                      value={""}
                      disabled
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
                    // value={formData.email}
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