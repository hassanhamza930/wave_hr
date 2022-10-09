import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { UserInterface } from "../../../atoms/app/globalUserAtom";


export default function useCheckCompanyOnboarding() {

    const [companyOnboarded, setCompanyOnboarded] = useState(true);
    const db = getFirestore();



    function checkCompanyOnboarding() {

        const userRef: string = localStorage.getItem("uid")!;

        if (userRef == undefined && userRef == null) {
            setCompanyOnboarded(false);
        }
        else {
            const unsub = onSnapshot(
                doc(db, "users", userRef),
                (doc) => {
                    if(doc.exists()){
                        var userDocData:UserInterface=doc.data() as UserInterface;
                        if(userDocData.companyOnboarded==true ){
                            console.log("company onboarded is true");
                            setCompanyOnboarded(true);
                        }
                        else{
                            console.log("company onboarded is false");
                            setCompanyOnboarded(false);
                        }
                    }
                    else{
                        setCompanyOnboarded(false);
                    }
                });
        }



    }

    useEffect(() => {
        checkCompanyOnboarding();
    }, []);


    return ({ companyOnboarded })


}