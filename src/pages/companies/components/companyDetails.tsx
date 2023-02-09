import { useRecoilState } from "recoil";
import { Heading } from "../../../standards/styles/components/heading";
import { selectedCompanyAtom } from "../atoms/selectedCompany";



function CompanyDetails() {

  const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyAtom);


  return (
    selectedCompany.docId == null ?

      <div id="no_scroll" className="flex justify-center items-center h-full rounded-md mb-10 w-full overflow-y-scroll">
        <div className="text-blue text-md">Select a job to see details</div>
      </div> :

      <div id="no_scroll" className="w-full h-[90%] mt-10 bg-blue rounded-md overflow-y-scroll">

        <div style={{ backgroundImage: `url('${selectedCompany.companyCover}')` }} className="h-72 w-full bg-blue bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
        <div style={{ backgroundImage: `url('${selectedCompany.companyLogo}')` }} className="h-36 w-36 bg-blue rounded-md ml-10 -mt-24 bg-cover bg-center bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/61a77a4a6e46e5363fbbde1d_purple-pink.png')]"></div>
        <div className="text-tan text-4xl font-bold px-10 py-5">
          {selectedCompany.companyName}
        </div>

      </div>
  );
}

export default CompanyDetails;