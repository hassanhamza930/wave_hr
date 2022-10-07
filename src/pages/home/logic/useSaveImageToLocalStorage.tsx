import { base64 } from "@firebase/util";
import { useRecoilState } from "recoil";
import selectedImageAtom from "../../../atoms/home/selectedImage";

export default function useSaveImageToLocalStorage() {

    const [selectedImage, setSelectedImageState] = useRecoilState(selectedImageAtom);

    function saveImageToLocalStorage() {
        var inputField = document.createElement("input");
        inputField.type = "file";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result=file!.target!.result! as string;
                console.log(base64Result);
                setSelectedImageState(base64Result);
            }
        };
        inputField.click();
        
    }

    return ({saveImageToLocalStorage})


}