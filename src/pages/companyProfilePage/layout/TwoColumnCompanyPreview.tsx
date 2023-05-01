import { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface ITwoColumnCompanyPreview {
  leftBar: ReactElement;
  rightBar: ReactElement;
  rightHeader: ReactElement;
}

const TwoColumnCompanyPreview = (props: ITwoColumnCompanyPreview) => {
  return (
    <div className='pb-5 bg-tan h-full md:h-[80vh] flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between mt-10 '>
      <div className='flex justify-center items-center flex-col h-full w-full md:w-[42%]'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          id='no_scroll'
          className='h-full w-full overflow-y-scroll bg-blue/5 rounded-3xl p-7 md:p-10'
        >
          {props.leftBar}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 70}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className='h-full w-full md:w-[57%] rounded-3xl bg-[#F2F7FF]'>
        {props.rightHeader}
        <div
          id='no_scroll'
          className='h-full w-full overflow-y-scroll'
        >
          {props.rightBar}
        </div>
      </motion.div>
    </div>
  );
};

export default TwoColumnCompanyPreview;
