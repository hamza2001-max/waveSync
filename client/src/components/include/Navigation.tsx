import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { TbWaveSine } from "react-icons/tb";
import { ContactManager } from "../settings/ContactManager";
import { useThemeZus, useUserZus } from "../../store";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [listVisible, setListVisible] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const theme = useThemeZus((state) => state.theme);
  const changeTheme = useThemeZus((state) => state.changeTheme);
  // const removeUser = useUserZus(state => state.removeUser);

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.get("http://localhost:7000/user/logout", {
          withCredentials: true
        }).then(() => {
          // removeUser();
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
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl">waveSync</h1>
        <TbWaveSine className={"text-xl"} />
      </div>
      <div className="flex items-center space-x-5" >
        <button
          className="text-lg capitalize"
          onClick={() => changeTheme()}>{theme} mode</button>
        <form onSubmit={handleLogout}>
          <button type="submit">
            log out
          </button>
        </form>
        <div className="relative" ref={listRef}>
          <button
            className="text-lg"
            onClick={() => setListVisible(prev => !prev)}>
            <FiMoreVertical />
          </button>
          {
            listVisible && (
              <div
                className="absolute right-0 whitespace-nowrap">
                <ContactManager />
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}
