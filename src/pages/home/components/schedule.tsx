function ScheduleCard() {
    return (
        <div className="hover:bg-purple hover:text-white text-purple hover:border-transparent border-purple border-2 w-3/4 bg-transparent rounded-xl flex justify-between items-center flex-row py-4 px-5 gap-3">


            <div className="flex flex-row justify-center items-center gap-5">
                <div className="bg-white h-12 w-12 rounded-md bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div>
                <div className=" text-xl">Interview with Arsalan</div>
            </div>

            <div className="text-md">10.30 AM</div>


        </div>

    )
}


export default function Schedule() {
    return (
        <div className="w-2/4 h-full flex justify-center items-center">

            <div className="flex flex-col h-full w-full justify-start items-start p-20 border-bray">

                <div className="text-2xl text-bray">Your Schedule looks like this today</div>

                <div className="flex flex-col justify-start items-start w-full h-full gap-2 pt-10">
                    <ScheduleCard />
                    <ScheduleCard />
                    <ScheduleCard />
                </div>

            </div>

        </div>
    )
}