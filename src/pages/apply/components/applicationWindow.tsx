import Page1 from "./applicationsPages/page1";

export default function ApplicationWindow() {
    return (
        <div className="h-screen w-full flex justify-center items-center fixed z-[90] bg-tan">
            <div className="relative h-[90%] bg-breen rounded-md w-[700px]">
                <Page1/>
            </div>
        </div>
    )
}