import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { TbWaveSine } from "react-icons/tb";
import { ContactManager } from "../settings/ContactManager";
export const Navigation = () => {
  const [listVisible, setListVisible] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <nav className='flex justify-between items-center mb-5'>
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl">waveSync</h1>
        <TbWaveSine className={"text-xl"} />
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
              className="absolute right-0 whitespace-nowrap">
              <ContactManager />
            </div>
          )
        }
      </div>
    </nav>
  )
}
