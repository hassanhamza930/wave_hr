import { useRecoilState } from "recoil";
import pageIndexAtom, { NewJobPosting, NewJobPostingAtom } from "../../../atoms/newJob/newJobAtom";

export default function useSubmitNewJob() {


    const [pageIndex, setPageIndex] = useRecoilState(pageIndexAtom);
    const [newJobPosting,setNewJobPosting]=useRecoilState(NewJobPostingAtom);

    function syncBasicNewJobDetailsValue(data:NewJobPosting) {
        setNewJobPosting(data);
        setPageIndex(1);
    }

    return ({ syncBasicNewJobDetailsValue });

}