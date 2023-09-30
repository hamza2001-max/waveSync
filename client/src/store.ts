import { create } from "zustand";

interface ITheme {
  theme: "light" | "dark";
}

interface IUseStoreZus {
  theme: ITheme["theme"];
  changeTheme: () => void;
}

export const useStoreZus = create<IUseStoreZus>((set) => ({
  theme: "light",
  changeTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
