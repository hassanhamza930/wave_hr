import { useRecoilState } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { doc, setDoc, getFirestore, onSnapshot, collection, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router';
import {
  selectedApplicantDataAtom,
  selectedApplicantIdAtom,
} from '../atoms/applicantsAtoms';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Listbox } from '@headlessui/react';
import { ApplicationDataInterface, ApplicationStatusEnum, CompanyDataInterface, JobDataInterface, UserDataInterface } from '../../../standards/interfaces/interfaces';
import { ButtonOutlinedWhite, StandardWhiteButton } from '../../../standards/styles/components/button';
import { SubHeading, Text } from '../../../standards/styles/components/heading';
import dayjs from 'dayjs';
import Slider from '../../../standards/components/Slider';
import { TextArea } from '../../../standards/styles/components/inputs';
import { AnimatePresence, motion } from 'framer-motion';
import StandardDropDown, { WhiteDropDown } from '../../../standards/styles/components/dropdowns';
import { MdArrowDropDown, MdChat, MdDelete, MdOutlineRateReview } from 'react-icons/md';
import axios from "axios";


export default function SelectedApplicantDetails() {
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState<string>(selectedApplicantIdAtom);
  const [selectedApplicantData, setSelectedApplicantData] = useRecoilState(selectedApplicantDataAtom);
  const [notes, setnotes] = useState("");
  const [rating, setrating] = useState(0);
  const db = getFirestore();
  const { jobId } = useParams();




  async function handleRejectApplicant(applicantId: string) {

    var jobData:JobDataInterface= (await getDoc(doc(db, 'jobs', jobId as string))).data() as JobDataInterface;
    await axios.post("https://wavehrback.onrender.com/sendRejectionEmail", {
      to: selectedApplicantData.email as string,
      jobId:jobId,
      companyId: jobData.companyId
    }).then(async (res) => {
      
      try{
        await setDoc(doc(db, 'jobs', jobId as string, 'applications', applicantId), {
          applicationStatus: ApplicationStatusEnum.Rejected,
        } as ApplicationDataInterface, { merge: true });
        setSelectedApplicantData({} as ApplicationDataInterface);
        setSelectedApplicantId("" as string);
        console.log(res);
        toast.success("Rejection Email Sent");
      }
      catch(e){
        console.log(e);
      }


    }).catch((err) => {
      console.log(err);
    });

    
  }


  async function handleSendInterviewInvite() {

    var jobData:JobDataInterface= (await getDoc(doc(db, 'jobs', jobId as string))).data() as JobDataInterface;
    await axios.post("https://wavehrback.onrender.com/sendInterviewInvite", {
      to: selectedApplicantData.email as string,
      jobId:jobId,
      companyId: jobData.companyId
    }).then(async (res) => {
      
      try{
        await setDoc(doc(db, 'jobs', jobId as string, 'applications', selectedApplicantId), {
          interviewInviteSent: true,
          applicationStatus: ApplicationStatusEnum.InterviewInviteSent
        } as ApplicationDataInterface, { merge: true });
        console.log(res);
        toast.success("Interview Invite Sent");
      }
      catch(e){
        console.log(e);
      }


    }).catch((err) => {
      console.log(err);
    });


    
  }






  useEffect(() => {
    if (selectedApplicantId) {
      onSnapshot(
        doc(db, 'jobs', jobId as string, 'applications', selectedApplicantId),
        (doc) => {
          setSelectedApplicantData(doc.data() as ApplicationDataInterface);
          setnotes(doc.data()?.notes);
          setrating(doc.data()?.rating);
        }
      );
    }

  }, [selectedApplicantId]);


  useEffect(() => {
    setnotes(selectedApplicantData.notes!);
    setrating(selectedApplicantData.rating!);
  }, [selectedApplicantData])


  //unmount
  useEffect(() => {
    return () => {
      console.log('Applicants Page Unmounted'); // this will clear out the selected data that is stored in global variables to make sure variables are fresh and empty the next time the user loads the applicants page with another job's data.
      setSelectedApplicantData({} as ApplicationDataInterface);
      setSelectedApplicantId("" as string);
    };
  }, [])



  return selectedApplicantId ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id='no_scroll'
      className='h-full w-full text-black rounded-md flex-col justify-start items-start overflow-y-scroll p-7'
    >
      <div className='flex flex-row justify-start items-start w-full'>
        {/* left */}
        <div id="no_scroll" className='w-2/4 border-r flex border-r-gray p-5'>
          <div className='gap-1 flex flex-col h-full w-full justify-start items-start pb-10'>

            <div style={{ backgroundImage: `url('${selectedApplicantData.profilePicture}')` }} className=' h-36 w-36 rounded-md bg-center bg-contain bg-no-repeat bg-blue' />
            <Text
              customStyles='mt-2'
              text={selectedApplicantData.name}
              textSize='text-2xl'
              fontWeight='font-bold'
              color='text-black'
            />
            <Text
              text={selectedApplicantData.email}
              textSize='text-sm'
              fontWeight='font-normal'
              color='text-dark-gray'
            />
            <Text
              text={`Applied on ${dayjs(selectedApplicantData?.applicationTime?.toDate()).format('DD/M/YY')}`}
              textSize='text-sm'
              fontWeight='font-normal'
              color='text-dark-gray'
            />

            <div className='flex flex-wrap justify-start items-start mt-5 gap-3'>
              <AnimatePresence>
                {
                  selectedApplicantData.interviewInviteSent==true && selectedApplicantData.rating != 0  &&
                  <WhiteDropDown
                    placeholder='Select Application Status'
                    value={selectedApplicantData.applicationStatus!}
                    icon={<MdArrowDropDown />}
                    
                    options={
                      Object.keys(ApplicationStatusEnum).map((key) => {
                        var correspondingOption=ApplicationStatusEnum[key as keyof typeof ApplicationStatusEnum];
                        return {
                          option: correspondingOption,
                          onClick: () => {
                            setDoc(doc(db, "jobs", jobId as string, "applications", selectedApplicantId), { applicationStatus: correspondingOption } as ApplicationDataInterface, { merge: true });
                          },
                        };
                      })
                    }
                  />
                }
                {
                  selectedApplicantData.interviewInviteSent != true && selectedApplicantData.rating!=0 &&
                  <StandardWhiteButton icon={<MdChat />} text='Interview' onClick={() => { handleSendInterviewInvite() }} />
                }
              </AnimatePresence>
              <StandardWhiteButton icon={<MdDelete />} text='Reject' onClick={() => { handleRejectApplicant(selectedApplicantId) }} />
            </div>


          </div>
        </div>
        {/* right */}
        <div className='p-5 w-2/4 '>
          {/* rating */}
          <div className='w-full'>
            <div className='flex items-center justify-between'>
              <Text
                text='Candidate Rating'
                color='text-black'
                textSize='text-md'
                customStyles='mb-2'
              />

              {
                rating != 0 && rating!=undefined ?
                  <div className='w-10 h-10 flex-none flex justify-center items-center text-tan bg-blue/90 text-sm rounded-full'>
                    {rating}
                  </div> :
                  <div className={`px-4 py-2 ${rating ? 'text-tan' : 'text-black'} text-center ${rating ? 'bg-blue/90' : 'bg-lightblue/10'} text-sm rounded-full`}>
                    Pending Review  
                  </div>
              }




            </div>
            <input
              type='range'
              min={1}
              max={10}
              step={1}
              value={rating}
              onChange={(newRating) => {
                setrating(Number(newRating.target.value));
                setDoc(
                  doc(db, 'jobs', jobId as string, 'applications', selectedApplicantId),
                  { rating: Number(newRating.target.value) },
                  { merge: true }
                );
              }}
              className='w-full h-2 bg-blue/20 rounded-full appearance-none outline-none'
            />
          </div>
          <div className='mt-4'>
            <TextArea
              placeholder=''
              examples='Notes'
              value={notes}
              onChange={async (value: string) => {
                console.log(value);
                setnotes(value);
                await setDoc(
                  doc(db, 'jobs', jobId as string, 'applications', selectedApplicantId),
                  { notes: value },
                  { merge: true }
                );
              }}
            />
          </div>

        </div>
      </div>

      <div className='flex flex-col justify-start items-start border-t border-t-gray p-5'>
        {selectedApplicantData.responses?.length ? (
          <>
            {selectedApplicantData.responses.map((response, index) => (
              <div key={index} className='text-md text-black font-normal mb-10'>
                <Text
                  text={`${index + 1})   ${response.question}`}
                  color='text-black'
                  fontWeight='font-bold'
                  textSize='text-md'
                />
                <Text
                  text={response.answer}
                  color='text-[#2D2D2D]'
                  fontWeight='500'
                  customStyles='ml-4 mt-2'
                  textSize='text-sm'
                />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>

      <embed
        src={selectedApplicantData.resume}
        className='h-[700px] w-full rounded-md p-10 pt-0'
      />
    </motion.div>
  ) : (
    <div className='flex justify-center items-center h-full w-full'>
      <SubHeading color='text-blue' text={`Select a candidate to see details ${selectedApplicantId}`} />
    </div>
  );
}
