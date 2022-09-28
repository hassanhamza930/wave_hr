import { BsArrowRightShort } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from 'framer-motion';

interface CandidateRowInputs {
    name: string,
    score: string,
    delay?: number
}

function CandidateRowHollow(props: CandidateRowInputs) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: props.delay }}
            variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            className="flex flex-row text-purple hover:text-white hover:bg-purple justify-between items-center w-2/4 px-2 py-1 rounded-md border-[2px] border-purple">

            <div className="flex flex-row justify-center items-center gap-3">
                <GiHamburgerMenu className="color-purple" size={20} />
                <div className="h-12 w-12 bg-purple rounded-md bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80')]"></div>
                <div className="font-bold  text-md ">{props.name}</div>
            </div>

            <div className="text-md">{props.score}</div>


        </motion.div>
    )
}


function CandidateRowFilled(props: CandidateRowInputs) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: props.delay }}
            variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            className="flex flex-row  text-white bg-purple justify-between items-center w-2/4 px-2 py-1 rounded-md border-[2px] border-purple">

            <div className="flex flex-row justify-center items-center gap-3">
                <GiHamburgerMenu className="color-purple" size={20} />
                <div className="h-12 w-12 bg-purple rounded-md bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80')]"></div>
                <div className="font-bold  text-md ">{props.name}</div>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
                <button className="hover:scale-105 hover:bg-white bg-transparent hover:text-purple text-white ml-5 px-3 py-1 border-2 border-white hover:border-purple rounded-md font-bold text-sm">Interview</button>
                <div className="text-md">{props.score}</div>

            </div>


        </motion.div>
    )
}


export default function SayGoodByeToExcelSheets() {
    return (
        <div className="h-screen w-full flex justify-start items-start px-[15%] py-24 flex-col">
            <div className="text-purple text-7xl font-bold">Say Goodbye to excel sheets</div>
            <div className="text-purple text-4xl font-bold">Simple drag and drop to manage and sort talent</div>

            <div className="text-purple text-xl font-regular mt-5 mb-10">
                Bring exception talent to the top of the list.
            </div>

            <div className="flex flex-col gap-2 w-full">
                {
                    ["Lex Friedman", "Joseph Rutterburg", "Kalailah Matty"].map((e, index) => {
                        if (index == 0) {
                            return (
                                <CandidateRowFilled name={e} score="9/10" delay={(index * 0.5) + 1} />
                            )
                        }
                        else {
                            return (
                                <CandidateRowHollow name={e} score="9/10" delay={(index * 0.5) + 1} />
                            )
                        }

                    })
                }
            </div>

            <div className="h-12 w-12 mt-20 bg-purple rounded-md flex justify-center items-center">
                <BsArrowRightShort size={40} color="white"></BsArrowRightShort>
            </div>
        </div>
    )

}