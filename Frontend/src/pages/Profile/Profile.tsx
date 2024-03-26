import {} from "react"

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
            <div className="">
              <div className=" flex gap-[5px] placeholder:text-[13.25px] h-[48px] mb-[16px] rounded mt-[16px] w-full ">
                <div className="flex flex-col items-start  xl:min-w-[205px] lg:w-[180px]">
                  <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                    First Name
                  </label>
                  <div className="w-full">
                    <input type="text" 
                    />
                    {/* <InputComponent
                      name="firstName"
                      value={formData.firstName}
                      disabled
                      className=" border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded px-10  mb-[16px] w-full"
                      type="text"
                      placeholder="Kelly"
                    /> */}
                  </div>
                </div>
                <div className="flex flex-col items-start lg:w-[180px]  xl:w-[205px]">
                  <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                    Last Name
                  </label>
                  <div className="w-full">
                  <input type="text" 
                    />
                    {/* <InputComponent
                      name="lastName"
                      className="border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] rounded p-2 w-full mb-[]"
                      type="text"
                      placeholder="Audu"
                      value={formData.lastName}
                      disabled
                    /> */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col  items-start lg:w-[370px] xl:w-[420px] mb-[]">
                <label htmlFor="businessName" className="text-[13px] text-[#666666] font-normal mt-9">
                  Business Name
                </label>
                <div className="w-full">
                  {/* <InputComponent
                    name="businessName"
                    className=" cursor-default border bg-[#F2F2F2] border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px]  rounded p-2 lg:w-[370px]  xl:w-[420px]"
                    type="text"
                    value={formData.businessName}
                    disabled
                    placeholder="Business Name"
                  /> */}
                </div>
              </div>

  
      
            </div>

            <div className=" justify-start mb-[11px]">
              <div className="flex flex-col items-start mt-5  lg:w-[370px]  xl:w-[420px]">
                <label htmlFor="first-name" className="text-[13px] text-[#666666] font-normal">
                  Email
                </label>
                <div className="w-full ">
                  {/* <InputComponent
                    name="email"
                    className="border  border-[#138EFF] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px] bg-[#F2F2F2] rounded p-2 lg:w-[370px]  xl:w-[420px] mb-[]"
                    type="text"
                    placeholder="Kelz4U@primaboost.com"
                    value={formData.email}
                    disabled
                  /> */}
                </div>
              </div>

              <div className="flex flex-col  items-start mt-5 lg:w-[370px]  xl:w-[420px]">
                <label htmlFor="phone-number" className="text-[13px] text-[#666666] font-normal">
                  Phone Number
                </label>
                 
              </div>

              <div className="flex flex-col  items-start lg:w-[370px]  xl:w-[420px]">
                <label htmlFor="Address" className="text-[13px] text-[#666666] font-normal mt-5">
                  Address
                </label>
                <div className="w-full">
                  {/* <InputComponent
                    name="address"
                    className="border  border-[#138EFF] bg-[#F2F2F2] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px]  rounded p-2 lg:w-[370px]  xl:w-[420px]"
                    type="text"
                    value={formData.address}
                    placeholder="Address"
                    disabled
                  /> */}
                </div>
              </div>
              <div className="flex flex-col items-start lg:w-[370px]  xl:w-[420px]">
                <label htmlFor="State" className="text-[13px] text-[#666666] font-normal mt-5 ">
                  State
                </label>
                <div className="w-full">
                  {/* <InputComponent
                    name="state"
                    className="border  border-[#138EFF] bg-[#F2F2F2] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px]  rounded p-2 lg:w-[370px]  xl:w-[420px]"
                    type="text"
                    value={formData.state}
                    placeholder="State"
                    disabled
                  /> */}
                </div>
              </div>
              <div className="flex flex-col items-start lg:w-[370px]  xl:w-[420px]">
                <label htmlFor="City" className="text-[13px] text-[#666666] font-normal mt-5">
                  City
                </label>
                <div className="w-full">
                  {/* <InputComponent
                    name="city"
                    className="border  border-[#138EFF] bg-[#F2F2F2] placeholder:text-[1rem] placeholder:text-[#000000] placeholder:font-normal h-[48px]  rounded p-2 lg:w-[370px]  xl:w-[420px] mb-[22px]"
                    type="text"
                    value={formData.city}
                    placeholder="City"
                    disabled
                  /> */}
                </div>
              </div>
              <hr className="border-b-1 w-[500px] mt-[-0.2em] ml-[-2em]" />

            </div>
          </div>
        </form>


    </div>
  </div>
  )
}

export default Profile