import { IAccordian } from "../../types"
import { FaAngleDown } from "react-icons/fa6"
import { cn } from "../../utils/cn";

export const Accordion = ({ title, children, bodyVisible, onClick }: IAccordian) => {
    return (
        <div className={cn("w-[23rem] sm:w-[27rem] md:w-[22rem] border-[1.2px] border-primary rounded-lg",
            { "space-y-2": bodyVisible })}>
            <div className="group flex justify-between items-center cursor-pointer px-5 py-3"
                onClick={() => { onClick(); }}>
                <h3 className="text-xl">{title}</h3>
                <FaAngleDown className={cn("group-hover:-translate-y-1 transition-all duration-300",
                    { "rotate-180": bodyVisible })} />
            </div>
            <p className={cn("text-lg overflow-hidden transition-all duration-300 px-5",
                bodyVisible ? `max-h-[15rem] pb-5 ` : "max-h-0  pb-0")}>{children}</p>
        </div>
    )
}
