import AllApplicants from '../components/AllApplicants';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';

export default function Applicants() {

  return (
    <>
      <TwoColumnLayoutPage
        header={
        <div className='text-sm flex justify-start items-center h-full w-full text-black'>
          Seeing applicants for <span className='text-black font-bold ml-1
          '>Frontend Developer</span>
        </div>
        }
        leftBar={<AllApplicants />}
        rightBar={<SelectedApplicantDetails />}
      />
    </>
  );
}
