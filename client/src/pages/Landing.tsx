import { GoHorizontalRule } from "react-icons/go";
export const Landing = () => {
    return (
        <section
            style={{
                "background": "linear-gradient(310deg, rgba(2,0,42,1) 0%, rgba(40,69,136,1) 38%, rgba(68,223,255,1) 100%)"
            }}>
            <div className="w-56">
                <h2>Join Us.</h2>
                <div className="flex flex-col items-center">
                    <button className="w-56">Sign up</button>
                    <button className="w-56">Sign up with Google</button>
                    <div className="flex items-center">
                        <GoHorizontalRule /><span className="pb-[0.2rem]">or</span><GoHorizontalRule />
                    </div>
                    <button className="w-56">Create An Account</button>
                </div>
            </div>
            <h1 className="text-8xl">Connect and Interact</h1>
        </section>
    )
}
