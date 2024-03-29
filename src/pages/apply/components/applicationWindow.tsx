import { useRecoilState } from "recoil";
import { ApplyPageIndexAtom } from "../atoms/applyPageAtoms";
import Page1 from "./applicationsPages/page1";
import Page2 from "./applicationsPages/page2";
import Page3 from "./applicationsPages/page3";
import Page4 from "./applicationsPages/page4";
import Page5 from "./applicationsPages/page5";
import Page6 from "./applicationsPages/page6";
import AppliedSuccessfully from "./applicationsPages/appliedSuccessfully";

export default function ApplicationWindow() {

    const [pageIndex,setPageIndex]=useRecoilState(ApplyPageIndexAtom);

    

    return (
        <div style={{fontFamily:"DM Sans"}} className="h-screen w-full flex justify-center items-center fixed z-[90] bg-tan">
            <div className="bg-darkblue flex justify-center items-center h-full w-full">
                {pageIndex==0&&<Page1/>}
                {pageIndex==1&&<Page2/>}
                {pageIndex==2&&<Page3/>}
                {pageIndex==3&&<Page4/>}
                {pageIndex==4&&<Page5/>}
                {pageIndex==5&&<Page6/>}
                {pageIndex==6&&<AppliedSuccessfully/>}
            </div>
        </div>
    )
}