import { doc, getDoc, getFirestore, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCamera } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { UserInterface } from "../../../atoms/app/globalUserAtom";
import isLoadingAtom from "../../../atoms/app/isLoadingAtom";
import { dataUrlToFile } from "../../home/logic/useSubmitOnboardingDataToFirebase";
import { NewPictureUploadedAtom, SelectedCompanyLogoAtom } from "../atoms/editCompanyAtoms";

export default function EditCompany() {

    const { watch, handleSubmit, register, setValue } = useForm();
    const [selectedCompanyLogo, setSelectedCompanyLogo] = useRecoilState<string>(SelectedCompanyLogoAtom);
    const db = getFirestore();
    const [loading, setLoading] = useRecoilState(isLoadingAtom);
    const [newPictureUploaded, setNewPictureUploaded] = useRecoilState(NewPictureUploadedAtom);
    const storage=getStorage();



    async function UpdateCompanyData() {

        var existingUserData:UserInterface= (await getDoc(doc(db, "users", localStorage.getItem("uid") as string))).data() as UserInterface;

        if(newPictureUploaded==true){
            existingUserData.companyDetails["companyName"]=watch("name");
            existingUserData.companyDetails["companyDescription"]=watch("description");
            existingUserData.companyDetails["numberOfTeamMembers"]=watch("noOfEmployees");
            
            var companyLogoData = selectedCompanyLogo;
            var companyLogoFileName = `companyLogos/${Timestamp.now().nanoseconds}.png`;
            var profilePictureFile = await dataUrlToFile(companyLogoData, companyLogoFileName);
            const profilePictureRef = ref(storage, `profilePictures/${localStorage.getItem("uid")}/${companyLogoFileName}`);
    
            await uploadBytes(profilePictureRef, profilePictureFile).then(async (snapshot) => {
                console.log('Uploaded the profilePicture');
                console.log(snapshot.metadata);
                var downloadLink = await getDownloadURL(profilePictureRef);
                existingUserData.companyDetails["companyLogo"]=downloadLink;
                await setDoc(doc(db,"users",localStorage.getItem("uid") as string),{
                    "companyDetails":existingUserData.companyDetails
                },{merge:true});
                window.location.reload();
            });
            toast.success("Company Details Updated");


           
        }
        else{
            existingUserData.companyDetails["companyName"]=watch("name");
            existingUserData.companyDetails["companyDescription"]=watch("description");
            existingUserData.companyDetails["numberOfTeamMembers"]=watch("noOfEmployees");
            
            await setDoc(doc(db,"users",localStorage.getItem("uid") as string),{
                "companyDetails":existingUserData.companyDetails
            },{merge:true});
            window.location.reload();
            toast.success("Company Details Updated");
        }

    }

    async function saveImageToLocalStorage() {
        var inputField = document.createElement("input");
        inputField.type = "file";
        inputField.accept = "image/png, image/jpeg, .svg";
        inputField.onchange = (e: any) => {
            e.preventDefault();
            var reader = new FileReader();
            var file: File = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = (file) => {
                console.log("loaded");
                var base64Result = file!.target!.result! as string;
                console.log(base64Result);
                setSelectedCompanyLogo(base64Result);
                setNewPictureUploaded(true);
            }
        };
        inputField.click();
    }

    async function syncDetails() {
        onSnapshot(doc(db, "users", localStorage.getItem("uid") as string), (doc) => {
            var userData: UserInterface = doc.data() as UserInterface;
            setLoading(true);
            setValue("name", userData.companyDetails.companyName);
            setValue("description", userData.companyDetails.companyDescription);
            setSelectedCompanyLogo(userData.companyDetails.companyLogo);
            setValue("noOfEmployees", userData.companyDetails.numberOfTeamMembers);
            console.log("set details");
            setLoading(false);
        });
    }


    useEffect(() => {
        syncDetails();
    }, [])


    

    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll ">
            <form className="h-full" onSubmit={handleSubmit(UpdateCompanyData)} >
                <div className="h-full w-[600px] p-5 overflow-y-scroll flex-1 flex-col justify-start items-start">

                    <div className="text-black font-bold text-4xl mt-10">Edit Company Details</div>


                    <div className="text-black text-sm font-bold mt-10">What's your company called?</div>
                    <input {...register("name")} placeholder="Company Name" className="mt-5 w-48 md:w-full border-b-[1px] border-black/90 text-black/80 bg-transparent outline-0 px-2 py-1 flex justify-center items-center"></input>

                    <div className="text-black text-sm font-bold mt-10">Enter company description</div>
                    <textarea {...register("description")} placeholder="Company Name" className="mt-5 w-48 h-36 md:w-full border-b-[1px] border-black/90 text-black/80 bg-transparent outline-0 px-2 py-1 flex justify-center items-center"></textarea>


                    <div className="text-black text-sm font-bold mt-10">Select a company logo</div>
                    <button
                        type="button"
                        onClick={() => { saveImageToLocalStorage() }}
                        style={{
                            backgroundColor: selectedCompanyLogo == "" ? "#eae0d5" : "#eae0d5",
                            backgroundImage: `url('${selectedCompanyLogo}')`
                        }}
                        className="hover:bg-blue shadow-xl mt-5 bg-blue bg-contain bg-no-repeat bg-center hover:scale-105 h-36 w-36 rounded-xl flex justify-center items-center">
                        {selectedCompanyLogo == "" && <AiFillCamera color="black" className="opacity-50" size={50} />}
                    </button>

                
                    <div className="text-black text-sm font-bold mt-10 ">What's the Number of employees at your company?</div>
                    <input type="number" min={0} max={300} {...register("noOfEmployees")} placeholder="Number of Employees" className="mb-5 mt-5 w-48 md:w-full border-b-[1px] border-black/90 text-black/80 bg-transparent outline-0 px-2 py-1 flex justify-center items-center"></input>

                    <button type="submit" className="mb-36 border-black border-[1px] hover:bg-blue bg-transparent text-black hover:text-tan px-6 py-2 flex flex-row justify-center items-center gap-2 rounded-md mt-10 text-sm">
                        Update
                    </button>


                </div>
            </form>
        </div>
    )
}