import { useRecoilState } from "recoil";
import pageIndexAtom from "../../newJob/atoms/newJobAtoms";
import Page1 from "./applicationsPages/page1";
import Page2 from "./applicationsPages/page2";

export default function ApplicationWindow() {

    const [pageIndex,setPageIndex]=useRecoilState(pageIndexAtom);

    return (
        <div className="h-screen w-full flex justify-center items-center fixed z-[90] bg-tan">
            <div className="relative h-[90%] bg-breen rounded-md w-[700px]">
                {pageIndex==0&&<Page1/>}
                {pageIndex==1&&<Page2/>}
            </div>
        </div>
    )
}