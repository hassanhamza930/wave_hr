import { useRecoilState } from 'recoil';
import { ApplicationDataInterface, ApplicationStatusEnum } from '../../../standards/interfaces/interfaces';
import { selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ApplicantCardInterface extends ApplicationDataInterface {
  index: number;
  key:string
}

const ApplicantCard=(props: ApplicantCardInterface)=>{
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(
    selectedApplicantIdAtom
  );
  const [_, setCurrentRoute] = useRecoilState(currentRouteAtom);

  return (
    <motion.div
    key={props.key}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: (props.index + 1) * 0.08 }}
    onClick={() => {
        setSelectedApplicantId(props.id!);
        setCurrentRoute(`Applicants > ${props.name}`);
      }}
      className={`cursor-pointer  hover:bg-blue/5 transition ease-in-out duration-150 flex w-full px-7 py-4 flex-row justify-between items-center border-t-[1px] border-gray`}
    >


        <div style={{backgroundImage:`url('${props.profilePicture}')`}} className='h-12 w-12 flex-none bg-blue rounded-full bg-cover bg-center'></div>


        <div className='w-full ml-3  flex overflow-clip flex-col justify-center items-start pr-2'>
          <div className='text-md font-bold '>{props.name}</div>
          <div className='text-md'>{props.email}</div>
        </div>

        <div className=' w-[30%] flex flex-none justify-end items-center'>
          <div className={`px-4 py-2 ${props.rating?'text-tan':'text-black'} text-center ${props.rating?'bg-blue/90':'bg-lightblue/10'} text-sm rounded-full`}>
            {props.rating ? props.rating : ApplicationStatusEnum.pendingReview}
          </div>
        </div>


    </motion.div>
  );
}

export default ApplicantCard;
