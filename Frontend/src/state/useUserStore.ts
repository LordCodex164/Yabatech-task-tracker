import { create } from "zustand";
import { userProfile } from "../fakedb/db";

interface userType{
    role: string
}

interface UseStore {
    user: userType[];
    signIn: () => void,
    createTask: () => Promise<void>;
    updateTask: () => Promise<void>;
    isLoading: boolean;
}


export const useUserStore = create<UseStore>((set, get) => ({
    user: [],
    signIn: () => {
       const {user} = get()
       set({user: [...user, userProfile]})
    },
    isLoading: false,
    createTask: async () => {
        
    },
     updateTask : async () => {
        
    },
}))