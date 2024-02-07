import { useState } from "react";
import { Accordion } from "../components/include/Accordion"
import { accordianData } from "../data/AccordianData";
import { Login } from "../components/landing/Login";
import { Registeration } from "../components/landing/Registeration";

export const Landing = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const handleActiveAccordion = (index: number) => {
        setActiveAccordion((prev) => {
            const valuesToCheck = [null, ...accordianData.map(prop => prop.id)];
            const elementExists = valuesToCheck.filter(prev => prev !== index).some(value => prev === value);
            return elementExists ? index : null;
        });
    }

    const googleAuth = () => {
        window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    }

    return (
        <section className="md:flex md:flex-col-reverse md:items-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-center mb-5 md:mb-0 sm:mt-8">Connect and Interact</h1>
            <div className="md:w-[45rem] lg:w-[48rem] md:flex justify-between items-center sm:mt-12 md:mt-16">
                <div className="flex flex-col items-center space-y-3 mb-10">
                    <h2 className="w-[18rem] xs:w-[20rem] text-xl font-semibold">Join Us.</h2>
                    <div className="w-[18rem] text-xl flex flex-col items-center space-y-3">
                        <Login />
                        <button className="w-[18rem] xs:w-[20rem] py-[0.6rem] border-[1px] border-primary rounded-3xl" onClick={googleAuth}>Login with Google</button>
                        <div className="flex items-center w-[18rem] xs:w-[20rem]">
                            <span className={"w-full h-[1.2px] bg-primary"} /><span className="pb-[0.2rem] -my-[0.4rem] px-2">or</span><span className={"w-full h-[1.2px] bg-primary"} />
                        </div>
                        <Registeration />
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-3 xs:space-y-4">
                    {accordianData.map((node, key) => {
                        return (
                            <Accordion
                                key={key}
                                onClick={() => handleActiveAccordion(node.id)}
                                title={node.title}
                                bodyVisible={activeAccordion === node.id}>
                                {node.body}
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </section >
    )
}
