import { atom } from "recoil";

const TimeSelectionPopupModalOpenAtom=atom({
    key: 'TimeSelectionPopupModalOpenAtom',
    default: false as boolean,
})


export const selectedDayIndexAtom=atom({
    key: 'selectedDayIndexAtom',
    default: 0 as number,
})


export default TimeSelectionPopupModalOpenAtom;