import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
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
    <nav className='flex justify-between items-center'>
      <h1 className="text-2xl">waveSync</h1>
      <div className="relative"
      >
        <button onClick={() => {
          setListVisible(prev => !prev);
        }}><FiMoreVertical /></button>
        {
          listVisible && (
            <div
              ref={listRef}
              className="absolute right-0 whitespace-nowrap">
              <ContactManager />
            </div>
          )
        }
      </div>
    </nav>
  )
}
