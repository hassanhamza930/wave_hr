import { addDoc, collection, doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";

export interface CompanyInformation{
    docId?:string,
    companyOwnerId?:string,
    companyLogo:string,
    companyCover:string,
    companyName:string,
    companyDescription:string,
    companyTags:Array<string>,
    numberOfEmployees:string,
    companyLocation:string
}









export function useHandleEditCompany(){

    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const storage = getStorage();
    const db=getFirestore();
    const navigate=useNavigate();

    async function UploadPictureAndGetDownloadLink(data:string):Promise<string>{
        var fileName = `Picture${Timestamp.now().nanoseconds}.png`;
        const fileRef = ref(storage, `pictures/${fileName}`);
        var downloadLink="";

        await uploadString(fileRef, data,'data_url').then(async (snapshot) => {
            console.log('Uploaded the resume');
            console.log(snapshot.metadata);
            downloadLink = await getDownloadURL(fileRef);
        });

        return downloadLink;
}






    async function EditCompany(companyDetails:CompanyInformation) {
        // if(false){
        if(companyDetails.companyDescription=="" || companyDetails.companyLogo=="" || companyDetails.companyName=="" || companyDetails.companyLocation=="" || companyDetails.companyTags.length==0 || companyDetails.numberOfEmployees==""){
            toast.error("Kindly enter all required information");
        }
        else{
            setLoading(true);
            var finalCompanyData:CompanyInformation=companyDetails;
            
            console.log("Company Logo Data is"+finalCompanyData.companyLogo);
            if(finalCompanyData.companyLogo.toString().includes("data")==true){
                finalCompanyData.companyLogo=await UploadPictureAndGetDownloadLink(finalCompanyData.companyLogo);
            }
            if(finalCompanyData.companyCover.toString().includes("data")==true){
                finalCompanyData.companyCover=await UploadPictureAndGetDownloadLink(finalCompanyData.companyCover);
            }
            else if(finalCompanyData.companyCover==""){
                finalCompanyData.companyCover="";
            }
            
            finalCompanyData.companyOwnerId=localStorage.getItem('uid') as string;
            await setDoc(doc(db,"companies",finalCompanyData.docId as string),finalCompanyData,{merge:true});
            setLoading(false);
            navigate("/companies")

        }
    }
    return {EditCompany};

}