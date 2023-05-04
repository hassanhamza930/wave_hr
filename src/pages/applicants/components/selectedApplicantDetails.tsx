import { useRecoilState } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { doc, setDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router';
import {
  selectedApplicantDataAtom,
  selectedApplicantIdAtom,
} from '../atoms/applicantsAtoms';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Listbox } from '@headlessui/react';
import { ApplicationDataInterface } from '../../../standards/interfaces/interfaces';
import { ButtonOutlinedWhite } from '../../../standards/styles/components/button';
import { Text } from '../../../standards/styles/components/heading';
import dayjs from 'dayjs';
import Slider from '../../../standards/components/Slider';
import { TextArea } from '../../../standards/styles/components/inputs';

export default function SelectedApplicantDetails() {
  const [selectedApplicantData, setSelectedApplicantData] =
    useRecoilState<JobApplication>(selectedApplicantDataAtom);
  const [rating, setRating] = useState(selectedApplicantData.rating ?? 0);
  const [notes, setNotes] = useState(selectedApplicantData.notes ?? '');
  const [isRatingChanged, setIsRatingChanged] = useState(false)
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState<string>(
    selectedApplicantIdAtom
  );
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const db = getFirestore();
  const { jobId } = useParams();
  const options = [
    'Interview Invite Sent',
    'Interview Done',
    "Didn't show up for interview",
    'Accepted',
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    if (selectedApplicantId) {
      onSnapshot(
        doc(db, 'jobs', jobId as string, 'applications', selectedApplicantId),
        (doc) => {
          setSelectedApplicantData(doc.data() as JobApplication);
          setSelectedOption(doc.data()!['applicationStatus']);
 
          setValue('notes', doc.data()!['notes']);
        }
      );
    }
  }, [selectedApplicantId]);

  async function handleRating() {
    if (!rating) {
      toast.error('Kindly enter a value for rank');
    } else {
      await setDoc(
        doc(
          db,
          'jobs',
          jobId as string,
          'applications',
          selectedApplicantId as string
        ),
        { rating },
        { merge: true }
      );
      toast.success('Rank Updated');
    }
  }


  async function rejectApplicant() {
    setSelectedApplicantId('');
    await setDoc(
      doc(
        db,
        'jobs',
        jobId as string,
        'applications',
        selectedApplicantId as string
      ),
      { applicationStatus: 'rejected' } as ApplicationDataInterface,
      { merge: true }
    );
    console.log(selectedApplicantId);
  }



  async function updateNotes(data: any) {
    await setDoc(
      doc(
        db,
        'jobs',
        jobId as string,
        'applications',
        selectedApplicantId as string
      ),
      { notes: data.notes },
      { merge: true }
    );
    toast.success('Notes Updated');
  }

  async function handleApplicationStatusChange(newValue: string) {
    setSelectedOption(newValue);
    setDoc(
      doc(
        db,
        'jobs',
        jobId as string,
        'applications',
        selectedApplicantId as string
      ),
      {
        applicationStatus: newValue,
      },
      { merge: true }
    );
  }

  async function interviewCandidate() {
    await setDoc(
      doc(
        db,
        'jobs',
        jobId as string,
        'applications',
        selectedApplicantId as string
      ),
      {
        applicationStatus: 'Interview Invite Sent',
        interviewInviteSent: true,
      } as JobApplication,
      { merge: true }
    );
    toast.success('Interview invite sent');
  }

  return selectedApplicantId ? (
    <div
      id='no_scroll'
      className='h-full 2xl:w-[60%] w-full text-black rounded-md flex-col justify-start items-start overflow-y-scroll'
    >
      <div className='flex'>
        {/* left */}
        <div className='p-10 border-r border-r-gray'>
          <div className='flex items-center'>
            <div className='h-20 w-20 rounded-full overflow-hidden'>
              <img
                src={selectedApplicantData.profilePicture}
                alt={selectedApplicantData.name}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='ml-6'>
              <Text
                text={selectedApplicantData.name}
                textSize='text-2xl'
                fontWeight='font-bold'
                color='text-black'
              />
              <Text
                text={selectedApplicantData.email}
                textSize='text-md'
                fontWeight='font-normal'
                color='text-[#545454]'
              />
              <Text
                text={`Applied on ${dayjs(
                  selectedApplicantData?.applicationTime?.toDate()
                ).format('DD/M/YY')}`}
                textSize='text-md'
                fontWeight='font-normal'
                color='text-[#545454]'
              />
            </div>
          </div>
        </div>
        {/* right */}
        <div className='p-10 w-full'>
          {/* rating */}
          <div className='relative w-full'>
            <div className='flex items-center justify-between'>
              <Text
                text='Add Rating'
                color='text-black'
                textSize='text-lg'
                customStyles='mb-2'
              />

              <div className='px-4 py-2 text-black bg-[rgba(1,97,254,0.07)] text-sm rounded-full'>
                {rating}
              </div>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={rating}
              onChange={(value) => {setRating(value)
              setIsRatingChanged(true)}}
            />
          </div>
          <div className='mt-4'>
            <TextArea
              placeholder=''
              examples='Notes'
              value={notes}
              onChange={(value: string) => setNotes(value)}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-start items-start border-t border-t-gray p-10'>
        {selectedApplicantData.responses?.length ? (
          <>
            {selectedApplicantData.responses.map((response, index) => (
              <div key={index} className='text-md text-black font-normal mb-10'>
                <Text
                  text={`${index + 1}.  ${response.question}`}
                  color='text-black'
                  fontWeight='500'
                  textSize='text-xl'
                />
                <Text
                  text={response.answer}
                  color='text-[#2D2D2D]'
                  fontWeight='500'
                  textSize='text-lg'
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
    </div>
  ) : (
    <div className='h-full text-black/60 rounded-md text-md flex flex-col justify-center items-center p-10'>
      Select a candidate to see details {selectedApplicantId}
    </div>
  );
}
