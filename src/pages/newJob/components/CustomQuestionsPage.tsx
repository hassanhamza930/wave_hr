import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPosting, NewJobPostingAtom, questionsAtom } from "../atoms/newJobAtoms";
import useSubmitOnboardingDataToFirebase from "../../home/logic/useSubmitOnboardingDataToFirebase";


export default function CustomQuestionsPage() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);
    const [questions, setQuestions] = useRecoilState(questionsAtom);


    const handleAddNewQuestion = (data: any) => {
        console.log(data.question);
        setQuestions([...questions, data.question]);
    }

    return (
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">

            <div className="w-[600px] h-[90%] bg-bray rounded-md overflow-y-scroll p-10">
                <div className="text-white/90 text-6xl font-bold">Add Custom Questions</div>
                <div className="text-white/90 text-xl mt-5 mb-10">Filter candidates based on answers</div>


                <form onSubmit={handleSubmit(handleAddNewQuestion)}>
                    <textarea {...register("question")} placeholder="How many years of experience do you have with React.js?" className=" w-96 border-b-[1px] border-white/90 text-white/90 bg-transparent outline-0 px-2 py-1 mt-3 flex justify-center items-center">
                    </textarea>
                    <button type={"submit"} onClick={() => { }} className=" mt-10 hover:text-breen text-white font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-white/90 hover:bg-white/90 rounded-md">
                        Add New Question
                    </button>
                </form>

                <div className="flex flex-col h-min gap-5 mt-10 w-full flex justify-start items-start">
                    {
                        questions.map((e, index) => {
                            return (
                                <div className="text-white font-bold text-xl">Q.{index} {e}</div>
                            )
                        })
                    }
                </div>

                <button onClick={() => { console.log("New Job Posted")}} className=" mt-10 hover:text-breen text-white font-bold hover:text-tan flex flex-row gap-5 justify-center items-center px-4 py-2 bg-transparent border-2 border-white/90 hover:bg-white/90 rounded-md">
                    Post Job
                </button>

            </div>



        </div>
    )
}