import {
  StandardButton,
  StandardDarkButton,
} from '../../../standards/styles/components/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { CompanyDataInterface } from '../../../standards/interfaces/interfaces';
import { selectedCompanyAtom } from '../atoms/selectedCompany';
import { useRecoilState } from 'recoil';
import { SubHeading } from '../../../standards/styles/components/heading';
import { useNavigate } from 'react-router';
import { allUserCompanies } from '../atoms/companies';

export const SidebarHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='pt-[75px] border border-black'>
      <StandardButton
        text='New Company'
        icon={<AiOutlinePlus />}
        onClick={() => navigate('/addNewCompany')}
      />
    </div>
  );
};

const LeftSidebar = ({ search }: { search: string }) => {
  const [selectedCompany, setSelectedCompany] =
    useRecoilState(selectedCompanyAtom);
  const [allCompanies] = useRecoilState(allUserCompanies);
  return (
    <>
      {allCompanies.isDataFetched ? (
        <>
          {allCompanies.companies.length ? (
            <>
              {allCompanies.companies.map((item: CompanyDataInterface) => {
                if (
                  item.companyName
                    .trim()
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
                ) {
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-10 w-full border-t border-t-[rgba(0,0,0,.13)] cursor-pointer ${
                        selectedCompany.id === item.id && 'bg-[#0161fe0d]'
                      }`}
                      onClick={() => setSelectedCompany(item)}
                    >
                      <div>
                        {/* <Heading text={item.companyName} customStyles='font-xl' /> */}
                        <h6 className='text-2xl font-[400] mb-[10px]'>
                          {item.companyName}
                        </h6>
                        <SubHeading text={'2 Jobs'} />
                      </div>

                      <StandardDarkButton
                        text={'View Company'}
                        icon={<FiExternalLink />}
                        bgColor='rgba(1, 97, 254, 0.07)'
                      />
                    </div>
                  );
                }
                return null;
              })}
            </>
          ) : (
            <SubHeading text='No Companies! Try Creating One' />
          )}
        </>
      ) : (
        <SubHeading text='Loading ...' />
      )}
    </>
  );
};

export default LeftSidebar;
