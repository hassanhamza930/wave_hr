import { useRecoilState } from 'recoil';
import { ApplicationDataInterface } from '../../../standards/interfaces/interfaces';
import { selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';

function ApplicantCard(props: ApplicationDataInterface) {
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(
    selectedApplicantIdAtom
  );
  const [_, setCurrentRoute] = useRecoilState(currentRouteAtom);

  return (
    <div
      onClick={() => {
        setSelectedApplicantId(props.id!);
        setCurrentRoute(`Applicants > ${props.name}`);
      }}
      className={`text-black py-6 gap-4 cursor-pointer hover:bg-blue/5 flex w-full flex-row justify-start items-center p-3 ${
        props.id! === selectedApplicantId && 'bg-blue/5'
      }`}
    >
      <div
        style={{
          backgroundImage: `url('${props.profilePicture}')`,
        }}
        className='bg-cover bg-center h-12 w-12 bg-blue rounded-full object-cover'
      ></div>

      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-col w-full justify-center items-start pr-2'>
          <div className='text-md font-bold '>{props.name}</div>
          <div className='text-md'>{props.email}</div>
        </div>

        <div className=' w-full h-full flex justify-end flex-row pr-3 gap-3 items-center'>
          <div className='px-4 py-2 text-black bg-[rgba(1,97,254,0.07)] text-sm rounded-full'>
            {props.rating ? props.rating : 'Pending Review'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantCard;
