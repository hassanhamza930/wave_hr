import { ReactElement } from 'react';

interface ITwoColumnCompanyPreview {
  leftBar: ReactElement;
  rightBar: ReactElement;
  rightHeader: ReactElement;
}

const TwoColumnCompanyPreview = (props: ITwoColumnCompanyPreview) => {
  return (
    <div className='pb-5 bg-tan h-full md:h-[80vh] flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between mt-10 '>
      <div className='flex justify-center items-center flex-col h-full w-full md:w-[42%]'>
        <div
          id='no_scroll'
          className='h-full w-full overflow-y-scroll bg-blue/5 rounded-3xl p-10'
        >
          {props.leftBar}
        </div>
      </div>
      <div className='h-full w-full md:w-[57%] rounded-3xl bg-[#F2F7FF]'>
        {props.rightHeader}
        <div
          id='no_scroll'
          className='h-full w-full overflow-y-scroll'
        >
          {props.rightBar}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnCompanyPreview;
