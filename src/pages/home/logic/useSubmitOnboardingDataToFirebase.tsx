import { base64 } from "@firebase/util";
import { useRecoilState } from "recoil";
import selectedImageAtom from "../../../atoms/home/selectedImage";



export default function useSubmitOnboardingDataToFirebase() {


    function submitOnboardingDataToFirebase(data:any) {
       console.log(data);
    }

    return ({submitOnboardingDataToFirebase})


}