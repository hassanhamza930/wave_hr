import {motion} from "framer-motion";

function FormLayout(props: any) {

    const { children } = props;
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="pt-[75px] pb-5 bg-tan w-full h-screen justify-center items-center flex">
            <div id="no_scroll" className="rounded-3xl w-[40%] h-full flex justify-start items-start flex-col bg-baige overflow-y-scroll">
                {children}
            </div>
        </motion.div>
    );
}

export default FormLayout;