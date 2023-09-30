export const Authorization = () => {
    return (
        <div className="flex flex-col items-center space-y-3 mb-10">
            <h2 className="w-[20rem] text-xl font-semibold">Join Us.</h2>
            <div className="w-[20rem] text-xl flex flex-col items-center space-y-3">
                <button className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl">Sign up</button>
                <button className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl">Sign up with Google</button>
                <div className="flex items-center w-[17rem]">
                    <span className={"w-full h-[1.2px] bg-black"} /><span className="pb-[0.2rem] -my-[0.4rem] px-2">or</span><span className={"w-full h-[1.2px] bg-black"} />
                </div>
                <button className="w-full py-[0.6rem] border-[1px] border-primary rounded-3xl inverse">Create An Account</button>
            </div>
        </div>
    )
}
