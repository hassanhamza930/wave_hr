import dayjs from "dayjs";
import { collection, getDocs, getFirestore, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { JobPosting } from "../../jobs/components/JobCard";

function NewJobApplicationCard() {
    return (
        <div className="hover:bg-breen hover:text-white text-breen hover:border-transparent border-breen border-2 w-full bg-transparent rounded-xl flex justify-between items-center flex-row py-4 px-5 gap-3">


            <div className="flex flex-row justify-center items-center gap-5">
                {/* <div className="bg-white h-12 w-12 rounded-md bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]"></div> */}
                <div className=" text-xl">Senior Software Engineer</div>
            </div>

            <div className="text-md">23 new applicants</div>


        </div>

    )
}


export default function Schedule() {

    const [newApps,setNewApps]=useState(0);
    const db=getFirestore();

    async function syncNewApps(){
        var docs= await getDocs(query(collection(db,"jobs"),where('postedBy',"==",localStorage.getItem("uid"))));
        docs.docs.forEach(async(doc)=>{
            console.log(doc.id);
            var docs2= await getDocs(query(collection(db,"jobs",doc.id,"applications"),where('applicationTime',">=", Timestamp.fromDate(dayjs().subtract(24,"hours").toDate()) )));
            var count=0;
            docs2.docs.forEach(()=>{
                count=count+1;
            })
            setNewApps(count);
        })
    }

    useEffect(()=>{
        syncNewApps();
    },[])

    return (
        <div className="w-2/4 h-full flex justify-center items-center">

            <div className="flex flex-col h-full w-full justify-start items-start p-20 border-bray">
                
               

                <div className="text-xl text-bray">You got {newApps} new applicants.</div>

                <div className="flex flex-col justify-start items-start w-full h-full gap-2 pt-10">
                    <NewJobApplicationCard/>
                    <NewJobApplicationCard/>
                    <NewJobApplicationCard/>
                </div>

            </div>

        </div>
    )
}