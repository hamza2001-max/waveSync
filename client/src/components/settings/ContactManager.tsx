import { AiOutlineUser, AiOutlineSmile } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import Modal from "../include/Modal";

export const ContactManager = () => {
  return (
    <Modal title={"Create Contacts"}>
      <form action="" className="space-y-5 py-8 px-7">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Contacts</h2>
          <button className="font-semibold border-[1.5px] border-primary px-4 py-1 rounded-full btn-effect">Save</button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4">
            <div className="flex ">
              <span className="text-3xl h-24 w-24 flex flex-col space-y-2 justify-center items-center border-[1.5px] border-black rounded-full">
                <input type="file" className="absolute opacity-0 cursor-pointer h-24 w-24 rounded-full" accept="image/*"/>
                <RiImageAddLine />
              </span>
              {/* <h3 className="text-sm font-semibold">Add Picture</h3> */}
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="fName" className="text-xl flex"><AiOutlineUser className={"mr-2"} /><span className="text-red-500">*</span></label>
              <input className="py-1 px-2" id="fName" placeholder="First Name" required />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="lName" className="text-xl"><AiOutlineUser /></label>
              <input className="py-1 px-2" placeholder="Last Name" />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="email" className="text-xl flex"><MdOutlineEmail className={"mr-2"} /><span className="text-red-500">*</span></label>
              <input className="py-1 px-2" placeholder="Email" required />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="nName" className="text-xl"><AiOutlineSmile /></label>
              <input className="py-1 px-2" placeholder="Nickname" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
