import AllApplicants from '../components/AllApplicants';
import SelectedApplicantDetails from '../components/selectedApplicantDetails';
import TwoColumnLayoutPage from '../../../standards/styles/layouts/twoColumnLayout';

export default function Applicants() {

  return (
    <>
      {/* <PageLayout>

            <div className="h-full w-full flex flex-row justify-between items-center">

                <AllApplicants/>
                <SelectedApplicantDetails/>

            </div>
        </PageLayout> */}
      <TwoColumnLayoutPage
        header={<></>}
        leftBar={<AllApplicants />}
        rightBar={<SelectedApplicantDetails />}
      />
    </>
  );
}
