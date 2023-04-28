import SimplifyingModernRecruitment from "../components/SimplifyingModernRecruitment";
import HumanInTheLoop from "../components/HumanInTheLoop";
import Pricing from "../components/PricingPlans/PricingPlan";
import OneStopSolution from "../components/OneStopSolution/OneStopSolution";
import ExperienceTheFuture from "../components/ExperienceTheFuture";
import WaveHRFooter from "../components/WaveHRFooter";

export default function LandingPage() {
  return (
    <div className="w-full bg-white flex justify-start items-center flex-col overflow-x-hidden">
      <SimplifyingModernRecruitment />
      <OneStopSolution />
      <HumanInTheLoop />
      <Pricing />
      <ExperienceTheFuture />
      <WaveHRFooter />
    </div>
  );
}
