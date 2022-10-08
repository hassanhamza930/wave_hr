import { base64 } from "@firebase/util";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import selectedImageAtom from "../../../atoms/home/selectedImage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { urlToHttpOptions } from "url";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";



export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}


export interface CompanyOnboardingData {
    companyName: string,
    companyDescription: string,
    numberOfTeamMembers: string,
    averageSalaryOfEmployees: string,
    companyLogo?:string
}


export default function useSubmitOnboardingDataToFirebase() {
    const [selectedImage, setSelectedImageState] = useRecoilState(selectedImageAtom);
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const db = getFirestore();
    const storage = getStorage();


    async function dumpDataToFirebase(data: CompanyOnboardingData) {

        try {
            setLoading(true);
            var fileName = `testingFile${Timestamp.now().nanoseconds}.png`;
            var logoImage = await dataUrlToFile(selectedImage, fileName);
            var userRef = localStorage.getItem("uid") as string;
            var docRef = doc(db, "users", userRef);

            const logoRef = ref(storage, `companyLogos/${userRef}/${fileName}`);
            await uploadBytes(logoRef, logoImage).then(async (snapshot) => {
                console.log('Uploaded the image');
                console.log(snapshot.metadata);
                var downloadLink= await getDownloadURL(logoRef);
                data.companyLogo=downloadLink;
                await setDoc(docRef, { companyDetails: data,companyOnboarded:true }, { merge: true });
                setLoading(false);
            });

        }
        catch (e: any) {
            console.log(e);
            setLoading(false);
            toast.error("Something went wrong");
        }

    }



    function submitOnboardingDataToFirebase(data: CompanyOnboardingData) {

        if (selectedImage == "") {
            toast.error("Please select a company logo")
        }
        else if (
            data.averageSalaryOfEmployees == "" ||
            data.companyDescription == "" ||
            data.companyName == "" ||
            data.numberOfTeamMembers == ""
        ) {
            toast.error("Please enter all details properly")
        }
        else {
            console.log(data);
            dumpDataToFirebase(data);
        }


    }

    return ({ submitOnboardingDataToFirebase })


}