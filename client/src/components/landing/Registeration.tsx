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

export const Registeration = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [formFields, setFormFields] = useState({
        profileImage: new File([], ''),
        fullname: "",
        username: "",
        email: "",
        password: ""
    });
    const [formError, setFormErrors] = useState({
        fullname: { status: false, reason: "" },
        username: { status: false, reason: "" },
        email: { status: false, reason: "" },
        password: { status: false, reason: "" }
    });
    const [serverError, setServerError] = useState("");

    const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
        setImgPreview(null);
        const imageFile = e.target.files?.[0];
        setFormFields({ ...formFields, profileImage: imageFile as File })
        if (imageFile) {
            const imageReader = new FileReader();
            imageReader.onload = (e) => {
                setImgPreview(e.target?.result as string);
            }
            imageReader.readAsDataURL(imageFile);
        }
    }


    // useEffect(() => {
    //     console.log(formFields.profileImage);

    // }, [formFields.profileImage]);
    // const mutationFn = async () => {
    //     try {
    //         const formdata = new FormData();
    //         formFields.profileImage.name && formdata.append('profileImage', formFields.profileImage);
    //         formdata.append('fullname', formFields.fullname);
    //         formdata.append('username', formFields.username);
    //         formdata.append('email', formFields.email);
    //         formdata.append('password', formFields.password);

    //         const response = await axios.post("http://localhost:7000/user/register", formdata, {
    //             headers: {
    //                 "Content-Type": formFields.profileImage.name ? "multipart/form-data" : "text/html",
    //             }
    //         }).catch(error => {
    //             console.log(error + " occured in axios catch");
    //         });

    //         console.log(response);

    //     } catch (error) {
    //         console.log(error + " occured in mutationFn catch");
    //     }
    // }

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                const formdata = new FormData();
                formFields.profileImage.name && formdata.append('profileImage', formFields.profileImage);
                formdata.append('fullname', formFields.fullname);
                formdata.append('username', formFields.username);
                formdata.append('email', formFields.email);
                formdata.append('password', formFields.password);

                const response = await axios.post("http://localhost:7000/user/register", formdata, {
                    headers: {
                        "Content-Type": formFields.profileImage.name ? "multipart/form-data" : "text/html",
                    }
                }).catch((error: AxiosError) => {
                    const errorMessage = error.response?.data as { message: string };
                    errorMessage && setServerError(errorMessage.message);
                });
                console.log(response);
                response && setServerError("");
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            console.log("success");
        }, onError: () => {
            console.log("error");

        },

    })

    const validateForm = () => {
        const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z]).{4,}$/.test(formFields.password);
        const isUsernameValid = formFields.username.split(" ").join("").length >= 4;
        const isFullnameValid = formFields.fullname.split(" ").join("").length >= 4;
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formFields.email);
        const errors = {
            fullname: {
                status: !formFields.fullname || !isFullnameValid,
                reason: !formFields.fullname ? "Fill out the fullname field." : !isFullnameValid ? "Fullname length should be greater than 4." : ""
            },
            username: {
                status: !formFields.username || !isUsernameValid,
                reason: !formFields.username ? "Fill out the username field." : !isUsernameValid ? "Username length should be greater than 4." : ""
            },
            email: {
                status: !formFields.email || !isEmailValid,
                reason: !formFields.email ? "Fill out the email field." : !isEmailValid ? "Invalid email format." : ""
            },
            password: {
                status: !formFields.password || !isPasswordValid,
                reason: !formFields.password ? "Fill out the password field." : !isPasswordValid ? "Password must be at least 4 characters with at least one uppercase and one lowercase letter." : ""
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
            setFormErrors({
                fullname: { status: false, reason: "" },
                username: { status: false, reason: "" },
                email: { status: false, reason: "" },
                password: { status: false, reason: "" }
            });
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <Modal
            clickable="Create An Account"
            className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl inverse">
            <form onSubmit={handleSubmition} className="flex flex-col items-center space-y-4 py-8 px-7">
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
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImgPreview} />
                    {!imgPreview ? <label className="cursor-pointer text-lg font-semibold" htmlFor="imgInput">Profile Picture</label> :
                        <span
                            className="text-sm font-semibold flex items-center cursor-pointer"
                            onClick={() => {
                                setImgPreview(null);
                                setFormFields({ ...formFields, profileImage: new File([], '') })
                            }}
                        ><FiTrash2 className={"mr-2"} />Remove</span>
                    }
                </div>
                <div>
                    <div className="flex items-center space-x-5">
                        <label htmlFor="fName" className="cursor-pointer text-xl flex"><AiOutlineUser className={"mr-2"} /></label>
                        <input id="fName" type="text" className="px-2 py-2 bg-secondary"
                            placeholder="Full Name" onChange={(e) => setFormFields({ ...formFields, fullname: e.target.value })} />
                    </div>
                    {formError.fullname.status && <p className="text-sm ml-12 mt-1 text-red-500">{formError.fullname.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-5">
                        <label htmlFor="uName" className="cursor-pointer text-xl flex"><BiSolidUserAccount className={"mr-2"} /></label>
                        <input id="uName" type="text" className="px-2 py-2 bg-secondary"
                            placeholder="Username" onChange={(e) => setFormFields({ ...formFields, username: e.target.value })} />

                    </div>
                    {formError.username.status && <p className="text-sm ml-12 mt-1 text-red-500">{formError.username.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-5">
                        <label htmlFor="email" className="cursor-pointer text-xl flex"><MdOutlineEmail className={"mr-2"} /></label>
                        <input id="email" type="email" className="px-2 py-2 bg-secondary"
                            placeholder="Email" onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
                    </div>
                    {formError.email.status && <p className="text-sm ml-12 mt-1 text-red-500">{formError.email.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-5">
                        <label htmlFor="password" className="cursor-pointer text-xl flex"><PiPassword className={"mr-2"} /></label>
                        <div className="relative">
                            <input id="password" type={hidePassword ? "password" : "text"} className="px-2 py-2 bg-secondary"
                                placeholder="Password" onChange={(e) => setFormFields({ ...formFields, password: e.target.value })} />
                            <span className="cursor-pointer absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                onClick={() => setHidePassword(prev => !prev)}>{hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                        </div>
                    </div>
                    {formError.password.status && <p className="text-sm ml-12 mt-1 text-red-500 w-60">{formError.password.reason}</p>}
                </div>

                {serverError && <p className="text-sm ml-12 mt-1 text-red-500 w-60">{serverError}</p>}
                <button type="submit" className="w-[19rem] py-[0.5rem] border-[1.5px] border-primary rounded-3xl inverse"
                    style={{
                        marginTop: "1.2rem"
                    }}>{isLoading ? "..." : "Submit"}</button>
            </form>
        </Modal>
    )
}
