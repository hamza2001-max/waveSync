import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface ITheme {
  theme: "light" | "dark";
}

interface IUseThemeZus {
  theme: ITheme["theme"];
  changeTheme: () => void;
}

export const useThemeZus = create<IUseThemeZus>((set) => ({
  theme: "light",
  changeTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

interface IUser {
  email: string;
  fullname: string;
  profileImage: string | null;
  username: string;
  createdAt: string;
}

interface IUseUserZus {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  removeUser: () => void;
}

export const useUserZus = create(persist<IUseUserZus>(
  (set) => ({
    user: null,
    setUser: (user: IUser | null) => set({ user }),
    removeUser: () => set({user: null})
  }), {
    name: "user store",
    storage: createJSONStorage(() => localStorage)
  }
));