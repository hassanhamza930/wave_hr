import { BsArrowRightShort} from "react-icons/bs";
import callingLogo from "../../../images/callingLogo.svg";

export default function InterviewInApp() {
    return (
        <div className="h-min w-full px-[15%] py-24 flex flex-col justify-start items-start">
            <div className="text-purple text-7xl font-bold">Interview in App</div>
            <div className="text-purple text-4xl font-bold">Never loose context</div>

            <div className="text-purple text-xl font-regular mt-10">
                Interview applicants 1x1 and take notes and update ranking in real time
            </div>



            <div className="flex flex-row justify-start items-start gap-5 my-10">
                    <div className="h-72 w-72 rounded-xl bg-bray/80 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1600603477970-7152b8ea521b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] "></div>
                    <div className="h-72 w-72 rounded-xl bg-bray/80 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1595017734643-07386d930c6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] "></div>
                    
                    <div className="h-72 w-96 rounded-xl bg-cover bg-center flex flex-col justify-between items-between">
                        <div className="h-[77%] w-full bg-purple rounded-xl flex justify-start items-start p-5 text-white  flex-col">
                            <div className="text-2xl font-bold">Notes</div>
                            <textarea placeholder="Applicant seems perfect for the job application, has a 1 month job notice." className="placeholder-white text-md font-normal bg-transparent h-full outline-none w-full flex justify-start items-start"></textarea>

                        </div>
                        
                        <div className="h-[20%] w-full flex flex-row gap-5 justify-start items-center px-2 py-2 text-white font-bold text-2xl">
                            <button className="bg-purple w-12 rounded-md h-full flex justify-center items-center"> - </button>
                            <div className="bg-purple w-12 rounded-md h-full flex justify-center items-center">9</div>
                            <button className="bg-purple w-12 rounded-md h-full flex justify-center items-center">+</button>
                        </div>

                    </div>

            </div>

            

            <img src={callingLogo} className="h-36"/>


        </div>
    )

}