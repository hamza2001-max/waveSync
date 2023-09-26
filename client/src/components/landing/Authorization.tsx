export const Authorization = () => {
    return (
        <div className="flex flex-col items-center space-y-2 my-10">
            <h2 className="w-48 text-xl font-semibold">Join Us.</h2>
            <div className="text-lg flex flex-col items-center space-y-2">
                <button className="w-full py-2 border-[1px] border-primary rounded-3xl">Sign up</button>
                <button className="w-full px-5 py-2 border-[1px] border-primary rounded-3xl">Sign up with Google</button>
                <div className="flex items-center w-full ">
                    <span className={"w-full h-[1.2px] bg-black"}/><span className="pb-[0.2rem] -my-[0.4rem] px-2">or</span><span className={"w-full h-[1.2px] bg-black"}/>
                </div>
                <button className="w-full py-2 border-[1px] border-primary rounded-3xl btn-effect">Create An Account</button>
            </div>
        </div>
    )
}
