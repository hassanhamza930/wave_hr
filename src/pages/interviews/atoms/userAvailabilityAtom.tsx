import {atom} from "recoil";
import { DailyTimeslotsInterface } from "../../../standards/interfaces/interfaces";

const userAvailabilityAtom=atom({
    key:"userAvailabilityAtom",
    default: [
        { day: "Monday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Tuesday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Wednesday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Thursday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Friday", enabled: true, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Saturday", enabled: false, startTime: "9:00 AM", endTime: "5:00 PM" },
        { day: "Sunday", enabled: false, startTime: "9:00 AM", endTime: "5:00 PM" },
      ] as Array<DailyTimeslotsInterface>
});

export default userAvailabilityAtom;