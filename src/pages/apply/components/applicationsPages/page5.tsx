import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillFile } from "react-icons/ai";
import { useRecoilState } from "recoil";
import pageIndexAtom from "../../../newJob/atoms/newJobAtoms";
import JobApplicationAtom, { ApplyPageIndexAtom, JobApplication, jobDataAtom, QuestionResponse, ResponsesAtom, selectedResumeAtom } from "../../atoms/applyPageAtoms";
import { motion } from "framer-motion";


export default function Page5() {

    const { watch, handleSubmit, register } = useForm<JobApplication>();
    const [jobApplication, setJobApplication] = useRecoilState(JobApplicationAtom);
    const [pageIndex, setPageIndex] = useRecoilState(ApplyPageIndexAtom);
    const [jobData, setJobData] = useRecoilState(jobDataAtom);
    const [questions, setQuestions] = useState<Array<string>>([]);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [responseValue, setResponseValue] = useState("");
    const [responses, setResponses] = useRecoilState(ResponsesAtom);

    useEffect(() => {
        console.log("this is coming from page 5");
        console.log(jobApplication);
        setQuestions(jobData.questions);
    }, []);



    function handleResponses() {
        console.log(responses);
        setResponses([...responses, { question: questions[questionIndex], answer: responseValue } as QuestionResponse]);

        if (questionIndex == (questions.length - 1)) {
            setPageIndex(5);
        }
        else {
            setQuestionIndex(questionIndex + 1);
            setResponseValue("");
        }

    }



    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
            }}
            className="text-left h-full rounded-md  flex justify-center items-start flex-col p-10 w-full md:w-[60%]">
            <div className="text-3xl font-bold text-white">Custom Questions</div>
            <div className="text-xl text-white mt-2">Please provide information for the required fields</div>

            {
                questions.map((question, index) => {

                    if (questionIndex == index) {
                        return (
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 50 }
                                }}
                                className="text-md md:text-xl font-bold text-white mt-10">
                                Q{questionIndex + 1}) {questions[questionIndex]}
                            </motion.div>
                        )
                    }
                    else {
                        return "";
                    }


                })
            }

            <input value={responseValue} onChange={(e) => { setResponseValue(e.target.value) }} placeholder="Value" className="mt-10 w-48 md:w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 flex justify-center items-center">
            </input>

            <button onClick={() => { handleResponses() }} type="button" className="border-white border-2 hover:bg-white bg-transparent text-white hover:text-breen px-8 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-20 w-min">
                Next
            </button>

        </motion.div>
    )
}