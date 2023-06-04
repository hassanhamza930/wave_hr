import { atom } from "recoil";


 const currentRouteAtom = atom({
    key: 'currentRouteAtom', // unique ID (with respect to other atoms/selectors)
    default: "Home" as string, // default value (aka initial value)
  });


export default currentRouteAtom;