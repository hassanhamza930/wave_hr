import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { UserDataInterface } from "../../../standards/interfaces/interfaces";

export default function useHandleGoogleSignIn() {

    async function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const db=getFirestore();

        await auth.signOut();
        signInWithPopup(auth, provider).then(async (result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            const user = result.user;
            console.log(user.displayName);

            var userDataToDumpOnFirebase:UserDataInterface={} as UserDataInterface;
            userDataToDumpOnFirebase.email=user.email;
            userDataToDumpOnFirebase.name=user.displayName;
            userDataToDumpOnFirebase.photoUrl=user.photoURL;

            await setDoc(doc(db,"users",user.uid),userDataToDumpOnFirebase,{merge:true});
            localStorage.setItem("uid",user.uid);
            window.location.href="/"

        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

        });


    }


    return { handleGoogleSignIn };

}