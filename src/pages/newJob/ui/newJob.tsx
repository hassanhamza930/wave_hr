import { useRecoilState } from "recoil";
import NewJobPageIndexAtom, { NewJobPostingAtom } from "../atoms/newJobAtoms";
import PostNewJobForm from "../components/BasicJobDetails";

export default function NewJob() {

    const [pageIndex, setPageIndex] = useRecoilState(NewJobPageIndexAtom);
    const [newJobPosting, setNewJobPosting] = useRecoilState(NewJobPostingAtom);

    

    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            <PostNewJobForm />
        </div>
    )
}