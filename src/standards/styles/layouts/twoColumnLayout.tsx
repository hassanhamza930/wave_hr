import { ReactComponentElement, ReactElement } from "react";

interface TwoColumnLayoutPageInputs {
    component1: ReactElement;
    component2: ReactElement;
}

function TwoColumnLayoutPage(props: TwoColumnLayoutPageInputs) {


    return (
        <div className="pt-[75px] pb-5 bg-tan h-screen w-full flex flex-row justify-between items-center px-[5%]">

            <div className="h-full w-[42%] rounded-3xl bg-blue/5">
                <div id="no_scroll" className="h-full w-full overflow-y-scroll p-7">
                    {props.component1}
                </div>
            </div>

            <div className="h-full w-[57%] rounded-3xl bg-blue/10">
            <div id="no_scroll" className="h-full w-full overflow-y-scroll p-7">
                    {props.component2}
                </div>
            </div>

        </div>
    );
}

export default TwoColumnLayoutPage;