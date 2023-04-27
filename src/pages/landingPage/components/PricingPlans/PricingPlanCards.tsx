import tickmarksvg from "../../../../images/landingPage/tickmark.svg";
export function Individual() {
  return (
    <div className="h-[650px] w-[350px] -mb-10 tracking-tighter p-5 border-2 border-black rounded-[18px] flex justify-start items-start flex-col text-black bg-white">
      <div className="flex flex-col w-full justify-center">
        <div className="font-bold text-[22px]">Individual</div>
        <div className="text-[13px] text-[#3E3E59]">For personal use</div>

        <p
          style={{ fontFamily: "Space Grotesk" }}
          className="font-bold text-[47px] text-primary"
        >
          $8
        </p>
        <p className="text-[13px]">Per Month</p>
      </div>

      <div className="flex flex-col gap-1 justify-start items-start">
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          <img src={tickmarksvg} className="mr-1" />
          Post 2 jobs at a time
        </div>

        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Email Automation
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Talent Pool Management
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Onboarding
        </div>
      </div>
      <button className="hover:scale-[1.02] w-full mt-[250px] text-sm px-8 py-3 rounded-[5px] bg-white outline outline-[2px] flex flex-row gap-2 justify-center items-center">
        <div className="text-black font-bold text-[16px]">Join Individual</div>
      </button>
    </div>
  );
}

export function Startup() {
  return (
    <div className="h-[650px] w-[350px] -mb-10 tracking-tighter p-5 border-2 border-black rounded-[18px] flex justify-start items-start flex-col text-black bg-white">
      <div className="flex flex-col w-full justify-center">
        <div className="font-bold text-[22px]">Startup</div>
        <div className="text-[13px] text-[#3E3E59]">For smaller teams</div>

        <p
          style={{ fontFamily: "Space Grotesk" }}
          className="font-bold text-[47px] text-primary"
        >
          $15
        </p>
        <p className="text-[13px]">Per Month</p>
      </div>

      <div className="flex flex-col gap-1 justify-start items-start">
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          <img src={tickmarksvg} className="mr-1" />
          Post 5 jobs at a time
        </div>

        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Collaboration
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Interview Scheduling{" "}
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Email Automation
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Talent Pool Management
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Company Profile
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Careers Page
        </div>
      </div>
      <button className="hover:scale-[1.02] w-full mt-[120px] text-sm px-8 py-3 rounded-[5px] bg-blue flex flex-row gap-2 justify-center items-center">
        <div className="text-tan font-bold text-[16px]">Join Startup</div>
      </button>
    </div>
  );
}

export function Pro() {
  return (
    <div className="h-[650px] w-[350px] -mb-10 tracking-tighter p-5 border-2 border-black rounded-[18px] flex justify-start items-start flex-col text-black bg-white">
      <div className="flex flex-col w-full justify-center">
        <div className="font-bold text-[22px]">Pro</div>
        <div className="text-[13px] text-[#3E3E59]">For larger teams</div>

        <p
          style={{ fontFamily: "Space Grotesk" }}
          className="font-bold text-[47px] text-primary"
        >
          $25
        </p>
        <p className="text-[13px]">Per Month</p>
      </div>

      <div className="flex flex-col gap-1 justify-start items-start">
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          <img src={tickmarksvg} className="mr-1" />
          Post 5 jobs at a time
        </div>

        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Collaboration
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Interview Scheduling{" "}
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Email Automation
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Talent Pool Management
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Company Profile
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Careers Page
        </div>
        <div className="flex flex-row text-[13px] font-medium text-black mt-5">
          {" "}
          <img src={tickmarksvg} className="mr-1" />
          Pending Feature
        </div>
      </div>
      <button className="hover:scale-[1.02] w-full mt-[80px] text-sm px-8 py-3 rounded-[5px] bg-black flex flex-row gap-2 justify-center items-center">
        <div className="text-tan font-bold text-[16px]">Join Pro</div>
      </button>
    </div>
  );
}
