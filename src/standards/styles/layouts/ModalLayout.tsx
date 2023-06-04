import { motion } from 'framer-motion';

interface ModalLayoutProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ModalLayout = ({ isOpen, children }: ModalLayoutProps) => {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-10'
          style={{ background: 'white' }}
          aria-modal={true}
          role='dialog'
        >
          <div className='rounded-3xl mt-10  w-[40%] h-[85%] flex justify-start items-start flex-col bg-baige overflow-y-scroll'>
            {children}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ModalLayout;
