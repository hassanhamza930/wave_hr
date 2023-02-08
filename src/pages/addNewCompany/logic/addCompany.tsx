import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { base64toPdfBlob } from "../../apply/components/applicationsPages/page6";
import CompanyLogo from "../components/companyLogo";

export interface CompanyInformation{
    companyOwnerId?:string,
    companyLogo:string,
    companyCover:string,
    companyName:string,
    companyDescription:string,
    companyTags:Array<string>,
    numberOfEmployees:string,
    companyLocation:string
}









export function useHandleAddCompany(){

    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const storage = getStorage();
    const db=getFirestore();


    async function UploadPictureAndGetDownloadLink(data:string):Promise<string>{
        var fileName = `Picture${Timestamp.now().nanoseconds}.png`;
        var fileData = base64toPdfBlob(data);
        const fileRef = ref(storage, `pictures/${fileName}`);
        var downloadLink="";

        await uploadBytes(fileRef, fileData).then(async (snapshot) => {
            console.log('Uploaded the resume');
            console.log(snapshot.metadata);
            downloadLink = await getDownloadURL(fileRef);
        });

        return downloadLink;
}






    async function AddCompany(companyDetails:CompanyInformation) {
        if(false){
        // if(companyDetails.companyDescription=="" || companyDetails.companyLogo=="" || companyDetails.companyName=="" || companyDetails.companyLocation=="" || companyDetails.companyTags.length==0 || companyDetails.numberOfEmployees==""){
            toast.error("Kindly enter all required information");
        }
        else{
            setLoading(true);
            var finalCompanyData:CompanyInformation=companyDetails;
            
            console.log("Company Logo Data is"+CompanyLogo);
            finalCompanyData.companyLogo=await UploadPictureAndGetDownloadLink(finalCompanyData.companyLogo);
            // finalCompanyData.companyCover=finalCompanyData.companyCover==""?"":await UploadPictureAndGetDownloadLink(finalCompanyData.companyCover)

            await addDoc(collection(db,"companies"),finalCompanyData);
            setLoading(false);

        }
    }
    return {AddCompany};

}
