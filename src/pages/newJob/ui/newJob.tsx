import { useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { Menu } from '@headlessui/react';

import isLoadingAtom from '../../../atoms/app/isLoadingAtom';
import { ButtonSolid } from '../../../standards/styles/components/button';
import {
  Heading,
  SubHeading,
} from '../../../standards/styles/components/heading';
import SimpleInput, {
  TextArea,
} from '../../../standards/styles/components/inputs';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';
import { selectedCompanyAtom } from '../../jobs/atoms/selectedCompanyAtom';
import ModalLayout from '../../../standards/styles/layouts/ModalLayout';
import { BiArrowBack } from 'react-icons/bi';
import { selectedJobAtom } from '../../jobs/jobsAtoms';

interface NewJobProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: JobDataInterface;
}

export default function NewJob({ isOpen, setIsOpen, data }: NewJobProps) {
  const [_, setLoading] = useRecoilState(isLoadingAtom);
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);
  const [jobTitle, setjobTitle] = useState<string>(data ? data.jobTitle : '');
  const [jobDescription, setJobDescription] = useState(
    data ? data.jobDescription : ''
  );
  const [jobQualifications, setjobQualifications] = useState(
    data ? data.jobQualifications : ''
  );
  const [salaryCompensation, setSalaryCompensation] = useState(
    data ? data.salaryCompensation : ''
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [location, setLocation] = useState(data ? data.location : '');
  const [jobType, setjobType] = useState(data ? data.jobType : '');
  const [workModel, setWorkModel] = useState(data ? data.workModel : '');
  const [questions, setQuestions] = useState<string[]>(
    data ? data.questions : []
  );
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);

  const workModels = ['Remote', 'Onsite', 'Hybrid'];
  const jobTypes = ['Full-time', 'Part-Time'];

  const db = getFirestore();

  async function handleAddNewJob() {
    if (!jobTitle.trim()) toast.error('Kindly enter Job title');
    else if (!jobDescription.trim())
      toast.error('Kindly enter Job description');
    else if (!jobQualifications.trim())
      toast.error('Kindly enter Job qualifications');
    else if (!salaryCompensation)
      toast.error('Kindly enter salary compensation');
    else if (!location) toast.error('Kindly enter location');
    else if (!jobType) toast.error('Kindly enter job type');
    else if (!workModel) toast.error('Kindly enter work model');
    else {
      setLoading(true);

      await addDoc(collection(db, 'jobs'), {
        companyId: selectedCompany.id,
        jobDescription: jobDescription,
        jobQualifications: jobQualifications,
        jobTitle: jobTitle,
        jobType: jobType,
        location: location,
        questions: questions,
        salaryCompensation: salaryCompensation,
        time: Timestamp.now(),
        workModel: workModel,
        postedBy: localStorage.getItem('uid') as string,
      } as JobDataInterface);

      setLoading(false);
      setIsOpen(false);
    }
  }

  async function updateJob() {
    if (!jobTitle.trim()) toast.error('Kindly enter Job title');
    else if (!jobDescription.trim())
      toast.error('Kindly enter Job description');
    else if (!jobQualifications.trim())
      toast.error('Kindly enter Job qualifications');
    else if (!salaryCompensation)
      toast.error('Kindly enter salary compensation');
    else if (!location) toast.error('Kindly enter location');
    else if (!jobType) toast.error('Kindly enter job type');
    else if (!workModel) toast.error('Kindly enter work model');
    else {
      setLoading(true);

      await setDoc(
        doc(db, 'jobs', data?.id as string),
        {
          companyId: selectedCompany.id,
          jobDescription: jobDescription,
          jobQualifications: jobQualifications,
          jobTitle: jobTitle,
          jobType: jobType,
          location: location,
          questions: questions,
          salaryCompensation: salaryCompensation,
          time: Timestamp.now(),
          workModel: workModel,
          postedBy: localStorage.getItem('uid') as string,
        } as JobDataInterface,
        { merge: true }
      );
      setSelectedJob({} as JobDataInterface);
      setLoading(false);
      setIsOpen(false);
    }
  }

  const handleJobSubmit = () => {
    data ? updateJob() : handleAddNewJob();
  };

  function addQuestion() {
    if (!customQuestion.trim()) {
      toast.error('Kindly enter a question');
    } else {
      setQuestions((prev) => [...prev, customQuestion]);
      setCustomQuestion('');
    }
  }

  function deleteQuestion(index: number): void {
    const updatedQuestions = questions.filter((question, i) => i !== index);
    setQuestions(updatedQuestions);
  }

  return (
    <ModalLayout isOpen={isOpen}>
      <div className='p-10 w-full flex-1 flex-col justify-start items-start'>
        <div className='flex items-center'></div>
        <button
          className=' absolute left-20 top-24 text-3xl text-blue'
          onClick={() => setIsOpen(false)}
        >
          <BiArrowBack />
        </button>

        <Heading text='Post a new job' />
        <SubHeading
          text='Open a new job posting and start receiving applications'
          customStyles='mt-2'
        />

        <SimpleInput
          examples='Software Engineer, Sales Lead etc'
          value={jobTitle}
          onChange={setjobTitle}
          placeholder='Job Title*'
          customStyles='mt-14'
        />

        <TextArea
          examples={`At ${selectedCompany.companyName} you would be responsible for ...`}
          customStyles='mt-10'
          placeholder='Please provide a description of the job*'
          value={jobDescription}
          onChange={setJobDescription}
        />
        <TextArea
          examples={
            'You would be the ideal candidate if you have the following qualifications...'
          }
          customStyles='mt-10'
          placeholder='Please provide qualifications required for the job*'
          value={jobQualifications}
          onChange={setjobQualifications}
        />

        <SimpleInput
          examples='$70,000 per annum'
          value={salaryCompensation}
          onChange={setSalaryCompensation}
          placeholder='Salary Compensation*'
          customStyles='mt-14'
        />
        <SimpleInput
          examples='Texas, US'
          value={location}
          onChange={setLocation}
          placeholder='Location*'
          customStyles='mt-14'
        />

        <SubHeading text='Work Model*' customStyles='mt-10  mb-2 text-sm' />
        <div className='relative'>
          <Menu>
            <Menu.Button className='border-[1px] border-black px-6 flex flex-row gap-2 justify-start items-center py-2 rounded-md text-sm'>
              {!workModel ? 'Select a work model' : workModel}
              <MdArrowDropDown className='text-blue h-4 w-4' />
            </Menu.Button>
            <Menu.Items
              className={
                'absolute shadow-xl z-50 mt-1 rounded-md bg-white flex flex-col justify-start items-start'
              }
            >
              {workModels.map((workModel) => {
                return (
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setWorkModel(workModel);
                      }}
                      className='text-sm flex justify-start items-start px-4 py-2 w-36'
                    >
                      {workModel}
                    </button>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </div>

        <SubHeading text='Job Type*' customStyles='mt-10  mb-2 text-sm' />

        <div className='relative'>
          <Menu>
            <Menu.Button className='border-[1px] border-black px-6 flex flex-row gap-2 justify-start items-center py-2 rounded-md text-sm'>
              {!jobType ? 'Select a job type' : jobType}
              <MdArrowDropDown className='text-blue h-4 w-4' />
            </Menu.Button>
            <Menu.Items
              className={
                'absolute shadow-xl z-50 mt-1 rounded-md bg-white flex flex-col justify-start items-start'
              }
            >
              {jobTypes.map((jobType) => {
                return (
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setjobType(jobType);
                      }}
                      className='text-sm flex justify-start items-start px-4 py-2 w-36'
                    >
                      {jobType}
                    </button>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </div>

        <SubHeading
          text='Custom Questions'
          customStyles='mt-14 font-bold mb-5'
        />

        <div className='flex flex-row justify-start w-full'>
          <SimpleInput
            examples='How many years of experience do you have with XYZ...'
            value={customQuestion}
            onChange={setCustomQuestion}
            placeholder='Add a custom question'
            customStyles='w-full'
          />
          <button onClick={addQuestion}>
            <AiFillPlusCircle className='text-blue hover:text-purp  h-10 w-10 ml-5 mt-7' />
          </button>
        </div>

        {questions.length ? (
          <div className='flex-col h-min gap-2 mt-10 w-full flex justify-start items-start'>
            {questions.map((e: any, index: any) => {
              return (
                <div
                  key={`${e}${index}`}
                  className='h-min flex flex-row justify-start items-start text-blue text-md border-2 rounded-md border-blue pt-3 px-4 py-2 w-full'
                >
                  <div className='w-10 mr-3 h-full  font-bold'>
                    Q.{index + 1}
                  </div>
                  <div className='w-full h-full '>{e}</div>
                  <button
                    onClick={() => {
                      deleteQuestion(index);
                    }}
                    type='button'
                    className='w-[10%] h-full flex justify-center items-end'
                  >
                    <MdDelete className='hover:scale-105' size={30} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}

        <ButtonSolid
          text={data ? 'Update Job' : 'Post Job'}
          onClick={handleJobSubmit}
          customStyles='mt-10'
        />
      </div>
    </ModalLayout>
  );
}
