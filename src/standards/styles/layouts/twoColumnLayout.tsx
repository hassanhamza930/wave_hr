import { ReactElement } from 'react';

interface TwoColumnLayoutPageProps {
  component1: ReactElement;
  component2: ReactElement;
  header?: ReactElement;
}

const TwoColumnLayoutPage = ({
  component1,
  component2,
  header,
}: TwoColumnLayoutPageProps): ReactElement => {
  return (
    <div className='pt-[75px] pb-5 bg-tan h-screen w-full flex flex-row justify-between items-center px-[5%]'>
      <div className='h-full w-[42%] rounded-3xl bg-blue/5'>
        {header && <div className=' rounded-t-3xl'>{header}</div>}
        <div id='no_scroll' className='h-full w-full overflow-y-scroll'>
          {component1}
        </div>
      </div>

      <div className='h-full w-[57%] rounded-3xl bg-blue/10'>
        <div id='no_scroll' className='h-full w-full overflow-y-scroll p-7'>
          {component2}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayoutPage;
