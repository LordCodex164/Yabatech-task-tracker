import { create } from "zustand";
import { getAllUsers } from "../backend/User";

export interface userType{
    _id: number,
    fullName: string,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string,
    tasks: tasksProps[],
    uniqueId: string
}

export interface tasksProps {
    id?:number,
    taskName: string,
    taskStatus: "not started" | "in progress" | "completed",
    timeStarted?: Date;
    deadLine?: Date;
    assignedUser: string;
    description: string;
  }

interface UseStore {
    staffs: userType[];
    getAllStaffs: () => Promise<userType[]>,
    isLoading: boolean;
}


export const useStaffStore = create<UseStore>((set, get) => ({
    staffs: [],
    getAllStaffs: async () => {
    set({isLoading: true})
     try {
    const staffs = await getAllUsers ()
    set({staffs, isLoading: true})
    return staffs
     } catch (error:any) {
        throw new Error(error?.message)
     }
    },
    isLoading: false,
}))