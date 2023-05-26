import { useEffect, useState } from 'react';
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
import isLoadingAtom from '../../app/atoms/isLoadingAtom';
import { ButtonSolid, StandardBlueButton } from '../../../standards/components/button';
import {
  Heading,
  SubHeading,
} from '@components/heading';
import SimpleInput from '@components/inputs';
import { JobDataInterface } from '../../../standards/interfaces/interfaces';
import { selectedCompanyAtom } from '../../jobs/atoms/selectedCompanyAtom';
import { selectedJobAtom } from '../../jobs/jobsAtoms';
import RichTextEditor from '@components/RichTextEditor';
import { useLocation, useNavigate } from 'react-router';
import FormLayout from '@layouts/FormLayout';
import StandardDropDown from '@components/dropdowns';


export default function JobForm() {

  const { state } = useLocation()
  const [_, setLoading] = useRecoilState(isLoadingAtom);
  const [selectedCompany] = useRecoilState(selectedCompanyAtom);
  const [jobTitle, setjobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState(state ? state.jobDescription : '');
  const [jobQualifications, setjobQualifications] = useState(state ? state.jobQualifications : '');
  const [salaryCompensation, setSalaryCompensation] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setjobType] = useState('');
  const [workModel, setWorkModel] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobAtom);

  const navigate = useNavigate()

  const workModels = ['Remote', 'Onsite', 'Hybrid'];
  const jobTypes = ['Full-time', 'Part-Time'];

  const db = getFirestore();

  useEffect(() => {
    if (state) {
      setjobTitle(state.jobTitle)
      setJobDescription(state.jobDescription)
      setjobQualifications(state.jobQualifications)
      setSalaryCompensation(state.salaryCompensation)
      setLocation(state.location)
      setjobType(state.jobType)
      setWorkModel(state.workModel)
      setQuestions(state.questions)
    }
  }, [])

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
      navigate('/jobs')
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
        doc(db, 'jobs', state.id as string),
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
      navigate('/jobs')


    }
  }

  const handleJobSubmit = () => {
    state ? updateJob() : handleAddNewJob();
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
    <FormLayout>
      <div className='p-10 w-full flex-1 flex-col justify-start items-start'>

        {/* <Heading text={state ? 'Update a job':'Post a new job'} />
        <SubHeading
          text='Open a new job posting and start receiving applications'
          customStyles='mt-2'
        /> */}

        <SimpleInput
          examples='Software Engineer, Sales Lead etc'
          value={jobTitle}
          onChange={setjobTitle}
          placeholder='Job Title*'
          customStyles=''
        />

        <RichTextEditor placeholder='Please provide a description of the job*' value={jobDescription} onChange={setJobDescription} examples={`At ${selectedCompany.companyName} you would be responsible for ...`} />
        <RichTextEditor customStyles='mt-10'
          placeholder='Please provide qualifications required for the job*'
          value={jobQualifications}
          onChange={setjobQualifications} examples={
            'You would be the ideal candidate if you have the following qualifications...'
          } />

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

        <StandardDropDown
          customStyles='mt-5'
          value={workModel}
          options={
            workModels.map((workModel) => {
              return { option: workModel, onClick: () => { setWorkModel(workModel) } };
            })
          }
          icon={<MdArrowDropDown />}
          placeholder='Select a work model'
        />

        <SubHeading text='Job Type*' customStyles='mt-10  mb-2 text-sm' />

        <StandardDropDown
          customStyles='mt-5'
          value={jobType}
          options={
            jobTypes.map((jobTypeOption) => {
              return { option: jobTypeOption, onClick: () => { setjobType(jobTypeOption) } };
            })
          }
          icon={<MdArrowDropDown />}
          placeholder='Select a Job Type'
        />



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
                  className='h-min flex flex-row justify-center items-center text-blue text-md border-2 rounded-3xl border-blue px-8 py-4 w-[90%]'
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

        <div className='flex flex-row justify-end items-end w-full mt-24 mb-24'>
          <StandardBlueButton
            text={state ? 'Update Job' : 'Post Job'}
            onClick={handleJobSubmit}
            customStyles=''
          />
        </div>
      </div>
    </FormLayout>
  );
}
