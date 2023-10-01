import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { PiPassword } from "react-icons/pi";
import { useState } from "react";
import Modal from "../include/Modal"

export const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <Modal
            clickable="Create An Account"
            className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl inverse">
            <form action="" className="flex flex-col items-center space-y-5 py-8 px-7">
                <h2 className="mb-3">Join Us By Creating An Account.</h2>
                <div className="flex items-center space-x-5">
                    <label htmlFor="fName" className="cursor-pointer text-xl flex"><AiOutlineUser className={"mr-2"} /></label>
                    <input id="fName" type="text" className="px-2 py-2 bg-secondary" placeholder="Full Name" />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="uName" className="cursor-pointer text-xl flex"><BiSolidUserAccount className={"mr-2"} /></label>
                    <input id="uName" type="text" className="px-2 py-2 bg-secondary" placeholder="Username" />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="email" className="cursor-pointer text-xl flex"><MdOutlineEmail className={"mr-2"} /></label>
                    <input id="email" type="email" className="px-2 py-2 bg-secondary" placeholder="Email" />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="password" className="cursor-pointer text-xl flex"><PiPassword className={"mr-2"} /></label>
                    <div className="relative">
                        <input id="password" type={hidePassword ? "password" : "text"} className="px-2 py-2 bg-secondary" placeholder="Password" />
                        <span className="cursor-pointer absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            onClick={() => setHidePassword(prev => !prev)}>{hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                    </div>
                </div>
                <button type="submit" className="w-full py-[0.4rem] border-[1px] border-primary rounded-3xl inverse">Create An Account</button>
            </form>
        </Modal>
    )
}
