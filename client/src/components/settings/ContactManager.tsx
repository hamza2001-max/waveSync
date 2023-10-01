import { ChangeEvent, useState } from "react";
import { AiOutlineUser, AiOutlineSmile } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { cn } from "../../utils/cn";
import Modal from "../include/Modal";

export const ContactManager = () => {
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const imageReader = new FileReader();
      imageReader.onload = (e) => {
        setImgPreview(e.target?.result as string);
      }
      imageReader.readAsDataURL(imageFile);
    }
  }

  return (
    <Modal clickable={"Create Contacts"}>
      <form action="" className="space-y-5 py-8 px-7">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create Contacts</h2>
          <button className="font-semibold border-[1.5px] border-primary px-4 py-1 rounded-full inverse">Save</button>
        </div>
        <div className="flex flex-col items-center space-y-7">
          <div className="flex flex-col items-center justify-center space-y-2">
            <label htmlFor="imgInput"
              className={cn("cursor-pointer text-3xl h-24 w-24 flex flex-col space-y-2 justify-center items-center", {
                "border-[1.5px] border-primary rounded-full": !imgPreview
              })}>
              {imgPreview ? <img
                src={imgPreview as string}
                alt="image-preview"
                className="h-24 w-24 rounded-full object-cover" /> :
                <RiImageAddLine />
              }
            </label>
            <input
              type="file"
              id="imgInput"
              className="hidden"
              accept="image/*"
              onChange={handleImgPreview} />
            {!imgPreview ? <label className="cursor-pointer text-sm font-semibold" htmlFor="imgInput">Add Picture</label> :
              <span
                className="text-sm font-semibold flex items-center cursor-pointer"
                onClick={() => setImgPreview(null)}
              ><FiTrash2 className={"mr-2"} />Remove</span>
            }
          </div>
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
