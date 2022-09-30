import {motion} from "framer-motion";

export default function ShufflingImages(){
    return(
        <div className="relative mt-40 mb-20 rounded-2xl w-full flex justify-center items-center pt-36 pb-72">
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9,delay:0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 100 }
            }}
            className="rounded-xl h-96 w-96 bg-bray/80 absolute z-0 -mt-10 -ml-72 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1543269866-487350d6fa5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')]"></motion.div>
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2,delay:0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 100 }
            }}
            className="rounded-xl h-96 w-96 bg-bray/90 absolute z-10 -mb-36 -mr-72 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80')]"></motion.div>
        </div>
    )
}