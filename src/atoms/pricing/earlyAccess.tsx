import { atom } from "recoil";

 const isEarlyAccessModalOpenAtom = atom({
    key: 'isEarlyAccessModalOpen', // unique ID (with respect to other atoms/selectors)
    default: false as boolean, // default value (aka initial value)
  });


export default isEarlyAccessModalOpenAtom;