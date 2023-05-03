import {atom} from "recoil";
import { DailyTimeslotsInterface } from "../components/TimeSlotSelection";

const userAvailabilityAtom=atom({
    key:"userAvailabilityAtom",
    default:[] as Array<DailyTimeslotsInterface>
});

export default userAvailabilityAtom;