import { useRecoilState } from 'recoil';
import { ApplicationDataInterface } from '../../../standards/interfaces/interfaces';
import { selectedApplicantIdAtom } from '../atoms/applicantsAtoms';
import currentRouteAtom from '../../../atoms/app/currentRouteAtom';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface ApplicantCardInterface extends ApplicationDataInterface {
  index: number;
}

const ApplicantCard=forwardRef((props: ApplicantCardInterface,ref)=>{
  const [selectedApplicantId, setSelectedApplicantId] = useRecoilState(
    selectedApplicantIdAtom
  );
  const [_, setCurrentRoute] = useRecoilState(currentRouteAtom);

  return (
    <motion.div
    ref={ref as any}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: (props.index + 1) * 0.08 }}
    onClick={() => {
        setSelectedApplicantId(props.id!);
        setCurrentRoute(`Applicants > ${props.name}`);
      }}
      className={`cursor-pointer  hover:bg-blue/5 transition ease-in-out duration-150 flex w-full px-7 py-4 flex-row justify-between items-center border-t-[1px] border-gray`}
    >


        <div style={{backgroundImage:`url('${props.profilePicture}')`}} className='h-12 w-12 flex-none bg-blue rounded-full bg-cover'></div>


        <div className='w-full ml-3  flex overflow-clip flex-col justify-center items-start pr-2'>
          <div className='text-md font-bold '>{props.name}</div>
          <div className='text-md'>{props.email}</div>
        </div>

        <div className=' w-[30%] flex flex-none justify-end items-center'>
          <div className='px-4 py-2 text-black text-center bg-[rgba(1,97,254,0.07)] text-sm rounded-full'>
            {props.rating ? props.rating : 'Pending Review'}
          </div>
        </div>


    </motion.div>
  );
})

export default ApplicantCard;
