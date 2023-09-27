import { Accordian } from "../components/include/Accordian"
import { Authorization } from "../components/landing/Authorization"

export const Landing = () => {
    return (
        <section
            style={{
                // "background": "linear-gradient(310deg, rgba(2,0,42,1) 0%, rgba(40,69,136,1) 38%, rgba(68,223,255,1) 100%)"
            }}>
            <div>
                <h1 className="text-8xl">Connect and Interact</h1>
                <Authorization />
            </div>
            <div className="space-y-3">
                <Accordian title="Features">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores harum alias aspernatur tempora placeat, eos quibusdam
                    sequi quisquam reiciendis at, possimus accusantium earum
                    quasi nemo aperiam, impedit iusto vero! Accusantium.
                </Accordian>
                <Accordian title="Contact Us">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores harum alias aspernatur tempora placeat, eos quibusdam
                    sequi quisquam reiciendis at, possimus accusantium earum
                    quasi nemo aperiam, impedit iusto vero! Accusantium.
                </Accordian>
            </div>
        </section>
    )
}
