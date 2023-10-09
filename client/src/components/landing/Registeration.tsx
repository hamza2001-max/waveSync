import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { BiSolidUserAccount } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useQuery } from "react-query";
import { PiPassword } from "react-icons/pi";
import { cn } from "../../utils/cn";
import { AiOutlineUser } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import Modal from "../include/Modal"
import axios from "axios";

export const Registeration = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        profileImage: "",
        fullName: "",
        userName: "",
        email: "",
        password: ""
    });

    const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        setFormData({ ...formData, profileImage: imageFile?.name as string })
        if (imageFile) {
            const imageReader = new FileReader();
            imageReader.onload = (e) => {
                setImgPreview(e.target?.result as string);
            }
            imageReader.readAsDataURL(imageFile);
        }
    }

    const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { } = useQuery("user", async () => {
            try {
                axios.post("http://localhost:7000/user/register", formData);
            } catch (error) {

            }
        })
    }

    return (
        <Modal
            clickable="Create An Account"
            className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl inverse">
            <form onSubmit={handleSubmition} className="flex flex-col items-center space-y-5 py-8 px-7">
                <h2 className="mb-3 font-semibold">Join Us By Creating An Account.</h2>
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
                    {!imgPreview ? <label className="cursor-pointer text-lg font-semibold" htmlFor="imgInput">Profile Picture</label> :
                        <span
                            className="text-sm font-semibold flex items-center cursor-pointer"
                            onClick={() => setImgPreview(null)}
                        ><FiTrash2 className={"mr-2"} />Remove</span>
                    }
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="fName" className="cursor-pointer text-xl flex"><AiOutlineUser className={"mr-2"} /></label>
                    <input id="fName" type="text" className="px-2 py-2 bg-secondary"
                        placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="uName" className="cursor-pointer text-xl flex"><BiSolidUserAccount className={"mr-2"} /></label>
                    <input id="uName" type="text" className="px-2 py-2 bg-secondary"
                        placeholder="Username" onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="email" className="cursor-pointer text-xl flex"><MdOutlineEmail className={"mr-2"} /></label>
                    <input id="email" type="email" className="px-2 py-2 bg-secondary"
                        placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="flex items-center space-x-5">
                    <label htmlFor="password" className="cursor-pointer text-xl flex"><PiPassword className={"mr-2"} /></label>
                    <div className="relative">
                        <input id="password" type={hidePassword ? "password" : "text"} className="px-2 py-2 bg-secondary"
                            placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <span className="cursor-pointer absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            onClick={() => setHidePassword(prev => !prev)}>{hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                    </div>
                </div>
                <button type="submit" className="w-[18rem] py-[0.5rem] border-[1.5px] border-primary rounded-3xl inverse"
                    style={{
                        marginTop: "1.5rem"
                    }}>Create An Account</button>
            </form>
        </Modal>
    )
}
