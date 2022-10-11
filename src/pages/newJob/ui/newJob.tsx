import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPostingAtom } from "../../../atoms/newJob/newJobAtom";
import BasicJobDetails from "../components/BasicJobDetails";
import CustomQuestionsPage from "../components/CustomQuestionsPage";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);

    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            {pageIndex == 0 && <BasicJobDetails />}
            {pageIndex == 1 && <CustomQuestionsPage />}
        </div>
    )
}