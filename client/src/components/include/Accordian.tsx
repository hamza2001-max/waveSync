import { useState } from "react"
import { IAccordian } from "../../typescript/includeTypes"
import { FaAngleDown } from "react-icons/fa6"
import { cn } from "../../utils/cn";

export const Accordian = ({ title, children }: IAccordian) => {
    const [bodyVisible, setBodyVisible] = useState(false);
    return (
        <div className={cn("border-[1.2px] border-primary rounded-lg ",
            { "space-y-2": bodyVisible })}>
            <div className="group flex justify-between items-center cursor-pointer px-5 py-3"
                onClick={() => setBodyVisible(prev => !prev)}>
                <h3 className="text-2xl">{title}</h3>
                <FaAngleDown className={cn("group-hover:-translate-y-1 transition-all duration-300",
                    { "rotate-180": bodyVisible })} />
            </div>
            <p className={cn("text-lg overflow-hidden transition-all duration-300 px-5",
                bodyVisible ? "h-[12rem]" : "h-0")}>{children}</p>
        </div>
    )
}
