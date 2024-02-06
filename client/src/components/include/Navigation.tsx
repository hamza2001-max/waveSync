import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { TbWaveSine } from "react-icons/tb";
import { ContactManager } from "../settings/ContactManager";
import { useThemeZus, useUserZus } from "../../store";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export const Navigation = () => {
  const [listVisible, setListVisible] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const theme = useThemeZus((state) => state.theme);
  const changeTheme = useThemeZus((state) => state.changeTheme);

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get("http://localhost:8500/user/logout", {
          withCredentials: true
        }).then(() => {
          useUserZus.persist.clearStorage();
        }).catch(error => {
          const errorMessage = error.response?.data as { message: string };
          console.log(errorMessage);
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  })

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!listRef.current?.contains(e.target as Node)) {
        setListVisible(false);
      }
    }
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  });

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
    navigate("/landing");
  }

  return (
    <nav className='flex justify-between items-center mb-5'>
      <div className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}>
        <h1 className="text-2xl">waveSync</h1>
        <TbWaveSine className={"text-xl"} />
      </div>
      <div className="flex items-center space-x-5" >
        <div className="hidden sm:flex items-center space-x-2">
          <MdCreate />
          <ContactManager />
        </div>
        <div className="relative" ref={listRef}>
          <button
            className="text-lg"
            onClick={() => setListVisible(prev => !prev)}>
            <FiMoreVertical />
          </button>
          {
            listVisible && (
              <div
                className="absolute right-0 whitespace-nowrap flex flex-col bg-secondary border-primary border-[1px] px-5 py-3 sm:py-1 rounded-md text-center space-y-2 text-[1.05rem]">
                <div className="flex items-center space-x-2 sm:hidden">
                  <MdCreate />
                  <ContactManager />
                </div>
                <span className={"w-full h-[1.2px] bg-primary sm:hidden"} />
                <button
                  className="flex items-center justify-center space-x-2"
                  onClick={() => changeTheme()}>{theme === "dark" ? <MdOutlineWbSunny /> :
                    <IoMdMoon />} <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
                </button>
                <span className={"w-full h-[1.2px] bg-primary"} />
                <form onSubmit={handleLogout} className="pb-2">
                  <button type="submit">
                    Logout
                  </button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}
