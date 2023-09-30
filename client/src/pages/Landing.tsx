import { useState } from "react";
import { Accordion } from "../components/include/Accordion"
import { Authorization } from "../components/landing/Authorization"
import { accordianData } from "../data/AccordianData";

export const Landing = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const handleActiveAccordion = (index: number) => {
        setActiveAccordion((prev) => {
            const valuesToCheck = [null, ...accordianData.map(prop => prop.id)];
            const elementExists = valuesToCheck.filter(prev => prev !== index).some(value => prev === value);
            return elementExists ? index : null;
        });
    }

    return (
        <section className="md:flex md:flex-col-reverse md:items-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-center mb-5 md:mb-0 md:mt-10">Connect and Interact</h1>
            <div className="md:w-[45rem] lg:w-[48rem] md:flex justify-between items-center sm:mt-12 md:mt-10">
                <Authorization />
                <div className="flex flex-col items-center space-y-3">
                    {accordianData.map(node => {
                        return (
                            <Accordion
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
