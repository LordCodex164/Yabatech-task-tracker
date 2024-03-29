import { create } from "zustand";
import { getAllUsers } from "../backend/User";

export interface userType{
    _id: string,
    fullName: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
}

interface UseStore {
    staffs: userType[];
    getAllStaffs: () => void,
    isLoading: boolean;
}


export const useStaffStore = create<UseStore>((set, get) => ({
    staffs: [],
    getAllStaffs: async () => {
    set({isLoading: true})
     try {
    const staffs = await getAllUsers ()
    console.log(staffs)
     set({staffs, isLoading: true})
     } catch (error:any) {
        throw new Error(error?.message)
     }
    },
    isLoading: false,
}))