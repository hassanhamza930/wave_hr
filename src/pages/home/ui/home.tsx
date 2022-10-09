import { useEffect } from "react";
import { useRecoilState } from "recoil";
import globalUserAtom from "../../../atoms/app/globalUserAtom";
import CompanyOnboardingPopup from "../components/companyOnboardingPopup";
import Hello from "../components/hello";
import Schedule from "../components/schedule";
import useCheckCompanyOnboarding from "../logic/useCheckCompanyOnboarding";



export default function Home() {

    const { companyOnboarded } = useCheckCompanyOnboarding();


    useEffect(() => {
    }, []);


    return (
        <>

            <div className="pt-[80px] h-screen w-full bg-tan flex flex-col justify-start item-start p-20">
                <div className="h-[600px] w-full flex flex-row mt-12">
                    <Hello />
                    <Schedule />
                </div>
            </div>
            {companyOnboarded==false&&<CompanyOnboardingPopup/>}

        </>
    )
}