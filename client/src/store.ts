import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUseUserZus, IUser } from "./types";

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

export const useUserZus = create(
  persist<IUseUserZus>(
    (set) => ({
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
      setUser: (user: IUser | null) => set({ user }),
    }),
    {
      name: "user store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
