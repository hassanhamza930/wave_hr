import { selectedApplicantAtom } from '../atoms/applicantsAtoms';
import { useRecoilState } from 'recoil';
import { JobApplication } from '../../apply/atoms/applyPageAtoms';


export default function SelectedApplicantDetails() {
    const [selectedApplicant, setSelectedApplicant] = useRecoilState<JobApplication>(selectedApplicantAtom);

    return (
        <div className="h-full w-[60%] text-white bg-bray rounded-md flex flex-col justify-start items-start p-10">

            <div className='flex flex-row w-full justify-between items-end'>
                <div className='flex flex-col justify-start items-start'>
                    <div style={{ backgroundImage: `url('${selectedApplicant.profilePicture}')` }} className='bg-cover bg-center h-48 w-48 bg-white rounded-md'></div>
                    <div className='bg-cover bg-center rounded-md text-white font-bold text-4xl mt-5'>{selectedApplicant.name}</div>
                    <div className='bg-cover bg-center rounded-md text-white font-regular text-xl mt-2'>{selectedApplicant.email}</div>

                </div>

                <div className='flex flex-col justify-between items-end h-full'>
                    <button className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-4 py-2 hover:bg-tan bg-transparent hover:text-breen text-white border-2 border-tan '>+9-</button>
                    <div className='flex flex-row justify-start items-center gap-2'>
                        <button className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-4 py-2 hover:bg-tan bg-transparent hover:text-breen text-white border-2 border-tan '>Interview</button>
                        <button className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-4 py-2 hover:bg-tan bg-transparent hover:text-breen text-white border-2 border-tan '>Interview</button>
                        <button className='bg-cover hover:scale-[1.05] hover:bg- bg-center rounded-md font-regular text-md mt-2 px-4 py-2 hover:bg-tan bg-transparent hover:text-breen text-white border-2 border-tan '>Interview</button>
                    </div>
                </div>


            </div>


        </div>
    )
}