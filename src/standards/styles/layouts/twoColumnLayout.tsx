import { ReactElement } from 'react';

interface TwoColumnLayoutPageProps {
  leftBar: ReactElement;
  rightBar: ReactElement;
  header: ReactElement;
}

const TwoColumnLayoutPage = (props: TwoColumnLayoutPageProps) => {
  return (
    <div className='pt-[75px] pb-5 bg-tan h-screen w-full flex flex-row justify-between items-center px-[5%]'>
      <div className='flex justify-center items-center flex-col h-full w-[42%]'>
        <div className='h-16 w-full flex justify-start items-start'>
          {props.header}
        </div>

        <div
          id='no_scroll'
          className='h-full w-full overflow-y-scroll bg-blue/5 rounded-3xl'
        >
          {props.leftBar}
        </div>
      </div>

      <div className='h-full w-[57%] rounded-3xl bg-blue/10'>
        <div
          id='no_scroll'
          className='h-full w-full overflow-y-scroll rounded-3xl'
        >
          {props.rightBar}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayoutPage;
