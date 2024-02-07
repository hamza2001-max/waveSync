import { MdOutlineEmail } from "react-icons/md"
import Modal from "../include/Modal"
import { PiPassword } from "react-icons/pi"
import { useState } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IUserRes } from "../../types";
import { useUserZus } from "../../store";

export const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [serverError, setServerError] = useState("");
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    });
    const [loginErrors, setLoginErrors] = useState({
        status: false, reason: ""
    });
    const navigate = useNavigate();
    const setUserZus = useUserZus(state => state.setUser);

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, loginFields, {
                    headers: {
                        "Content-Type": "application/json",
                    }, withCredentials: true
                }).catch((error: AxiosError) => {
                    const errorMessage = error.response?.data as { message: string };
                    errorMessage && setServerError(errorMessage.message);
                });
                if (response && response.data) {
                    const responseData: IUserRes = response.data;
                    setUserZus(responseData.formatedData);
                    setServerError("");
                }
            } catch (error) {
                console.log(error, " in the try/catch block of login useMutation.");
            }
        },
        onError: () => {
            console.log("error in the login useMutation.");
        },
    });

    const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginFields.email);
        const emailError = {
            status: !loginFields.email || !isEmailValid,
            reason: !loginFields.email ? "Fill out the email field." : !isEmailValid ? "Invalid email format." : ""
        };
        if (!emailError.status) {
            mutate();
            setLoginErrors({ status: false, reason: "" });
            navigate("/");
        } else {
            setLoginErrors(emailError);
        }
    }

    return (
        <Modal
            clickable="Login"
            className="w-[18rem] xs:w-[20rem] py-[0.6rem] border-[1px] border-primary rounded-3xl">
            <form
                onSubmit={handleSubmition}
                className="flex flex-col items-center space-y-4 py-8 px-7">
                <h2 className="mb-3 font-semibold">Enter your credentials.</h2>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="email" className="cursor-pointer text-xl flex"><MdOutlineEmail className={"mr-2"} /></label>
                        <input id="email" type="email" className="px-2 py-2 bg-secondary w-[14rem]"
                            placeholder="Email"
                            onChange={(e) => setLoginFields({ ...loginFields, email: e.target.value })}
                        />
                    </div>
                    {loginErrors.status && <p className="text-sm ml-12 mt-1 text-red-500">{loginErrors.reason}</p>}
                </div>
                <div>
                    <div className="flex items-center space-x-2 sm:space-x-5">
                        <label htmlFor="password" className="cursor-pointer text-xl flex"><PiPassword className={"mr-2"} /></label>
                        <div className="relative">
                            <input id="password"
                                type={hidePassword ? "password" : "text"}
                                className="px-2 py-2 bg-secondary w-[14rem]"
                                placeholder="Password" 
                                onChange={(e) => setLoginFields({ ...loginFields, password: e.target.value })}
                            />
                            <span className="cursor-pointer absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                onClick={() => setHidePassword(prev => !prev)}
                            >
                                {hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </span>
                        </div>
                    </div>
                </div>
                {serverError && <p className="text-sm ml-12 mt-1 text-red-500 w-60">{serverError}</p>}

                <button type="submit" className="w-[16rem] py-[0.5rem] border-[1.5px] border-primary rounded-3xl inverse"
                    style={{
                        marginTop: "1.2rem"
                    }}>
                    {isLoading ? "..." : "Continue"}
                </button>
            </form>
        </Modal>
    )
}
