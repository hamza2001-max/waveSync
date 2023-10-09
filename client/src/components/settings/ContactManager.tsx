import { AiOutlineUser, AiOutlineSmile } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import Modal from "../include/Modal";
import { ImgPreview } from "../include/imgPreview";

export const ContactManager = () => {
  return (
    <Modal clickable={"Create Contacts"}>
      <form action="" className="space-y-5 py-8 px-7">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Contacts</h2>
          <button className="font-semibold border-[1.5px] border-primary px-4 py-1 rounded-full inverse">Save</button>
        </div>
        <div className="flex flex-col items-center space-y-7">
          <ImgPreview />
          <div className="space-y-3">
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="fName" className="text-xl flex"><AiOutlineUser className={"mr-2"} /><span className="text-red-500">*</span></label>
              <input type="text" className="py-1 px-2" id="fName" placeholder="First Name" required />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="lName" className="text-xl"><AiOutlineUser /></label>
              <input type="text" className="py-1 px-2" placeholder="Last Name" />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="email" className="text-xl flex"><MdOutlineEmail className={"mr-2"} /><span className="text-red-500">*</span></label>
              <input type="email" className="py-1 px-2" placeholder="Email" required />
            </div>
            <div className="flex justify-between items-center space-x-6">
              <label htmlFor="nName" className="text-xl"><AiOutlineSmile /></label>
              <input type="text" className="py-1 px-2" placeholder="Nickname" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
