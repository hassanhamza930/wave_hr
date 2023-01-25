export function Indivisual() {
    return (
        <button className="h-96 w-96 -mb-10 tracking-tighter p-5 hover:bg-black bg-transparent border-2 border-black/50 rounded-md flex justify-start items-start flex-col text-black hover:text-white/80">
            <div className="flex flex-row justify-between w-full items-center">
                <div className="font-bold text-4xl">Indivisual</div>
                <div className="font-bold text-md mt-2">8 USD/month</div>
            </div>

            <div className="font-bold text-xl">For personal use</div>



            <div className="flex flex-col gap-1 justify-start items-start">
                <div className="font-medium text-md mt-10">Post 2 jobs at a time</div>
                <div className="font-medium text-md">Email Automation</div>
                <div className="font-medium text-md">Talent Pool Management</div>
                <div className="font-medium text-md">Onboarding</div>
            </div>








        </button>
    );
}




export function Startup() {
    return (
        <button className="h-96 w-96 tracking-tighter p-5 hover:bg-purp bg-transparent border-2 border-purp/50 rounded-md flex justify-start items-start flex-col text-purp hover:text-white/80">
            <div className="flex flex-row justify-between w-full items-center">
                <div className="font-bold text-4xl">Startup</div>
                <div className="font-bold text-md mt-2">15 USD/month</div>
            </div>
            <div className="font-bold text-xl">For a smaller team</div>

            <div className="flex flex-col justify-start items-start gap-1">
                <div className="font-medium text-md mt-10">Post 5 jobs at a time</div>
                <div className="font-medium text-md">Collaboration</div>
                <div className="font-medium text-md">Interview Scheduling</div>
                <div className="font-medium text-md">Email Automation</div>
                <div className="font-medium text-md">Talent Pool Management</div>
                <div className="font-medium text-md">Company Profile</div>
                <div className="font-medium text-md">Careers Page</div>
            </div>

        </button>
    );
}


export function HRFirm() {
    return (
        <button className="h-3/5 w-96 -mb-10 tracking-tighter p-5 hover:bg-blue bg-transparent border-2 border-blue/50 rounded-md flex justify-start items-start flex-col text-blue hover:text-white/80">
            <div className="flex flex-row justify-between w-full items-center">
                <div className="font-bold text-4xl">HR Firm</div>
                <div className="font-bold text-md mt-2">25 USD/month</div>
            </div>

            <div className="font-bold text-xl">For a larger team</div>
            <div className="font-medium text-md mt-10">Post unlimited jobs</div>
            <div className="font-medium text-md">Collaboration</div>
            <div className="font-medium text-md">Interview Scheduling</div>
            <div className="font-medium text-md">Email Automation</div>
            <div className="font-medium text-md">Talent Pool Management</div>
            <div className="font-medium text-md">Company Profile</div>
            <div className="font-medium text-md">Careers Page</div>

        </button>
    );
}
