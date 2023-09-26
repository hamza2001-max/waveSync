import { useState } from "react"
import { IAccordian } from "../../typescript/includeTypes"

export const Accordian = ({ title, children }: IAccordian) => {
    const [bodyVisible, setBodyVisible] = useState(false);
    return (
        <div className="border-[1.2px] border-primary rounded-lg px-5 py-3 space-y-5">
            <h3
                className="cursor-pointer text-2xl"
                onClick={() => setBodyVisible(prev => !prev)}
            >{title}</h3>
            {
                bodyVisible && <p className="text-lg">{children}</p>
            }
        </div>
    )
}
