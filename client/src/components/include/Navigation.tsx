import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { ContactManager } from "../settings/ContactManager";
export const Navigation = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuVisible(false);
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
          setMenuVisible(prev => !prev);
        }}><FiMoreVertical /></button>
        {
          menuVisible && (
            <div
              ref={menuRef}
              className="absolute right-0 whitespace-nowrap">
              <ContactManager />
            </div>
          )
        }
      </div>
    </nav>
  )
}
