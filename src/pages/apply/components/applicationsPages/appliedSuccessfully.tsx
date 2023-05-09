import { motion } from "framer-motion";
import { StandardBlueButton } from "../../../../standards/styles/components/button";

function AppliedSuccessfully() {

    return (

        <div className={`bg-[url("https://img.freepik.com/free-vector/gradient-dynamic-grainy-background_52683-101978.jpg")] bg-cover bg-center bg-no-repeat relative h-screen w-full flex flex-col justify-start items-start`}>
            <div className='relative px-5 md:px-[20%] w-full h-full flex flex-col justify-center items-center bg-darkblue/80'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 50 }
                    }}
                    className="flex md:justify-center md:items-center h-auto w-full md:w-auto px-5 py-10 md:py-10 md:px-10">

                    <div id="no_scroll" className="flex flex-col gap-20 justify-start items-start h-full w-full overflow-y-scroll p-5 md:p-16 bg-tan rounded-3xl">
                        <div className="text-xl md:text-3xl font-bold text-black/90 text-left">Your application was<br /> successfully submitted! ✅</div>
                        <StandardBlueButton text="Go Back" onClick={() => {
                            window.location.reload();
                        }} />
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

export default AppliedSuccessfully;