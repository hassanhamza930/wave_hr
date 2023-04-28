interface ButtonInputs {
  text: string;
  onClick: Function;
  customStyles?: string;
}

function ButtonOutlinedWhite(props: ButtonInputs) {
  return (
    <button
      type={'submit'}
      onClick={() => {
        props.onClick();
      }}
      className={`${props.customStyles} hover:font-bold font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-[1px] border-tan hover:bg-tan text-sm hover:text-blue text-tan rounded-md `}
    >
      {props.text}
    </button>
  );
}

function ButtonOutlinedBlue(props: ButtonInputs) {
  return (
    <button
      type={'submit'}
      onClick={() => {
        props.onClick();
      }}
      className={`${props.customStyles} hover:font-bold font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-[1px] border-blue hover:bg-blue text-sm hover:text-tan text-blue rounded-md `}
    >
      {props.text}
    </button>
  );
}

function ButtonSolid(props: ButtonInputs) {
  return (
    <button
      type='submit'
      onClick={() => {
        props.onClick();
      }}
      className={` hover:text-tan hover:shadow-xl text-tan font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-blue hover:bg-purp rounded-md text-sm ${props.customStyles}`}
    >
      {props.text}
    </button>
  );
}

interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const StandardLightBlueButton = ({text,icon,onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-3 px-5 shadow-sm hover:shadow-md rounded-3xl bg-[#D9F1FF] text-black text-sm font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

const StandardDarkButton = ({
  text,
  bgColor = '#D9F1FF',
  textColor = '#000',
  textSize = 'text-base',
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-3xl bg-[#0161fe12] text[${textSize}] text-[${textColor}] font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

const StandardLightButton = ({
  text,
  bgColor = '#D9F1FF',
  textColor = '#000',
  textSize = 'text-base',
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-3xl bg-[#fff] text[${textSize}] text-[${textColor}] font-medium outline-none border-none`}
    >
      {icon && <span className='text-[24px]'>{icon}</span>}
      {text}
    </button>
  );
};

export {
  ButtonOutlinedWhite,
  ButtonOutlinedBlue,
  ButtonSolid,
  StandardLightBlueButton,
  StandardDarkButton,
  StandardLightButton,
};
