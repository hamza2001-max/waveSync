import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { BiSolidUserAccount } from "react-icons/bi";
import { ChangeEvent, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { cn } from "../../utils/cn";
import { AiOutlineUser } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { useMutation } from "react-query";
import Modal from "../include/Modal"
import axios, { AxiosError } from "axios";
import { useUserZus } from "../../store";
import { IUserRes } from "../../types";
import { useNavigate } from "react-router-dom";
export const Registeration = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [regFields, setRegFields] = useState({
        profileImage: new File([], ''),
        fullname: "",
        username: "",
        email: "",
        password: ""
    });
    const [regErrors, setRegErrors] = useState({
        fullname: { status: false, reason: "" },
        username: { status: false, reason: "" },
        email: { status: false, reason: "" },
        password: { status: false, reason: "" }
    });
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const setUserZus = useUserZus(state => state.setUser);

    const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
        setImgPreview(null);
        const imageFile = e.target.files?.[0];
        setRegFields({ ...regFields, profileImage: imageFile as File })
        if (imageFile) {
            const imageReader = new FileReader();
            imageReader.onload = (e) => {
                setImgPreview(e.target?.result as string);
            }
            imageReader.readAsDataURL(imageFile);
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                const formdata = new FormData();
                regFields.profileImage.name && formdata.append('profileImage', regFields.profileImage);
                formdata.append('fullname', regFields.fullname);
                formdata.append('username', regFields.username);
                formdata.append('email', regFields.email);
                formdata.append('password', regFields.password);
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, formdata, {
                    headers: {
                        "Content-Type": regFields.profileImage.name ? "multipart/form-data" : "text/html",
                    }, withCredentials: true
                }).catch((error: AxiosError) => {
                    const errorMessage = error.response?.data as { message: string };
                    errorMessage && setServerError(errorMessage.message);
                });
                console.log(response);
                if (response && response.data) {
                    setServerError("");
                    const responseData: IUserRes = response.data;
                    setUserZus(responseData.formatedData);
                }
            } catch (error) {
                console.log(error, " in the try/catch block of registeration useMutation.");
            }
        },
        onError: () => {
            console.log("error in the registeration useMutation.");
        },
    });

    const validateForm = () => {
        const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z]).{4,}$/.test(regFields.password);
        const isUsernameValid = regFields.username.split(" ").join("").length >= 4 && regFields.username.split(" ").join("").length <= 15;
        const isFullnameValid = regFields.fullname.split(" ").join("").length >= 4 && regFields.fullname.split(" ").join("").length <= 15;
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regFields.email);
        const errors = {
            fullname: {
                status: !regFields.fullname || !isFullnameValid,
                reason: !regFields.fullname ? "Fill out the fullname field." : !isFullnameValid ? "Full Name is not of required length (4-15)." : ""
            },
            username: {
                status: !regFields.username || !isUsernameValid,
                reason: !regFields.username ? "Fill out the username field." : !isUsernameValid ? "Username is not of required length (4-15)." : ""
            },
            email: {
                status: !regFields.email || !isEmailValid,
                reason: !regFields.email ? "Fill out the email field." : !isEmailValid ? "Invalid email format." : ""
            },
            password: {
                status: !regFields.password || !isPasswordValid,
                reason: !regFields.password ? "Fill out the password field." : !isPasswordValid ? "Password must be at least 4 characters with at least one uppercase, one lowercase letter and one special character." : ""
            },
        };

        return {
            errors,
            isValid: Object.values(errors).every((field) => !field.status),
        };
    }

    const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { errors, isValid } = validateForm();
        if (isValid) {
            mutate();
            setRegErrors({
                fullname: { status: false, reason: "" },
                username: { status: false, reason: "" },
                email: { status: false, reason: "" },
                password: { status: false, reason: "" }
            });
            navigate("/");
        } else {
            setRegErrors(errors);
        }
    }

    return (
        <Modal
            clickable="Create An Account"
            className="w-[18rem] xs:w-[20rem] py-[0.6rem] border-[1px] border-primary rounded-3xl inverse">
            <form onSubmit={handleSubmition} className="flex flex-col items-center space-y-4 py-8 px-7">
                <h2 className="mb-3 font-semibold">Create an account.</h2>
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
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImgPreview} />
                    {imgPreview &&
                        <span
                            className="text-sm font-semibold flex items-center cursor-pointer"
                            onClick={() => {
                                setImgPreview(null);
                                setRegFields({ ...regFields, profileImage: new File([], '') })
                            }}
                        ><FiTrash2 className={"mr-2"} />Remove</span>
                    }
                </div>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="fName" className="cursor-pointer text-xl flex"><AiOutlineUser className={"mr-2"} /></label>
                        <input id="fName" type="text" className="px-2 py-2 bg-secondary w-[14rem]"
                            placeholder="Full Name" onChange={(e) => setRegFields({ ...regFields, fullname: e.target.value })} />
                    </div>
                    {regErrors.fullname.status && <p className="text-sm ml-12 mt-1 text-red-500">{regErrors.fullname.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="uName" className="cursor-pointer text-xl flex"><BiSolidUserAccount className={"mr-2"} /></label>
                        <input id="uName" type="text" className="px-2 py-2 bg-secondary w-[14rem]"
                            placeholder="Username" onChange={(e) => setRegFields({ ...regFields, username: e.target.value })} />
                    </div>
                    {regErrors.username.status && <p className="text-sm ml-12 mt-1 text-red-500">{regErrors.username.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="email" className="cursor-pointer text-xl flex"><MdOutlineEmail className={"mr-2"} /></label>
                        <input id="email" type="email" className="px-2 py-2 bg-secondary w-[14rem]"
                            placeholder="Email" onChange={(e) => setRegFields({ ...regFields, email: e.target.value })} />
                    </div>
                    {regErrors.email.status && <p className="text-sm ml-12 mt-1 text-red-500">{regErrors.email.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="password" className="cursor-pointer text-xl flex"><PiPassword className={"mr-2"} /></label>
                        <div className="relative">
                            <input id="password" type={hidePassword ? "password" : "text"} className="px-2 py-2 bg-secondary w-[14rem]"
                                placeholder="Password" onChange={(e) => setRegFields({ ...regFields, password: e.target.value })} />
                            <span className="cursor-pointer absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                onClick={() => setHidePassword(prev => !prev)}>{hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                        </div>
                    </div>
                    {regErrors.password.status && <p className="text-sm ml-12 mt-1 text-red-500 w-60">{regErrors.password.reason}</p>}
                </div>

                {serverError && <p className="text-sm ml-12 mt-1 text-red-500 w-60">{serverError}</p>}
                <button type="submit" className="w-[16rem] py-[0.5rem] border-[1.5px] border-primary rounded-3xl inverse"
                    style={{
                        marginTop: "1.2rem"
                    }}>{isLoading ? "..." : "Submit"}</button>
            </form>
        </Modal>
    )
}
