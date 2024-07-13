import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist((set) => ({
    user: null,
    setUser: (user) => set({user}),
    logout: () => set({user: null})
  }),{
    name:"user",
    storage:createJSONStorage(()=>localStorage)
  })
);

export const useAddressStore = create((set)=>({
  address : null,
  updateAddress: (address)=>set({address})
}))
