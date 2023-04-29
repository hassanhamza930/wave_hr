import { Text } from '../../../standards/styles/components/heading';

const Footer = () => {
  return (
    <div className='w-full bg-blue px-20 py-14'>
      <div className='flex items-center border-b border-b-white pb-5'>
        <Text
          text='Powered By'
          color='text-white'
          fontWeight='font-bold'
          textSize='text-md'
        />
        <div className='ml-4'>
          <img src='/logoTransparent.svg' alt='' />
        </div>
      </div>

      <div className='mt-5'>
        <Text text='© 2023 WaveHR. All rights reserved.' color='text-white' />
      </div>
    </div>
  );
};

export default Footer;
