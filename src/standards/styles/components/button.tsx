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
  customStyles?: string;
  onClick?: () => void;
}


const StandardLightBlueButton = ({customStyles,text,icon,onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${customStyles} transition ease-in-out duration-100 flex items-center justify-center gap-2 py-3 px-5 shadow-md hover:shadow-xl rounded-3xl bg-[#D9F1FF] text-black text-sm font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export const StandardMidBlueButton = ({text,icon,onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`transition ease-in-out duration-100 flex items-center justify-center gap-2 py-3 px-5 shadow-md hover:shadow-xl rounded-3xl bg-[#0161FE]/[0.07] text-black text-sm font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};


export const StandardWhiteButton = ({text,icon,onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`transition ease-in-out duration-100 flex items-center justify-center gap-2 py-3 px-5 shadow-md hover:shadow-xl rounded-3xl bg-white text-black text-sm font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};


const StandardBlueButton = ({
  text,
  textColor = '#000',
  textSize = 'text-base',
  icon,
  onClick,
  customStyles
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${customStyles} hover:shadow-xl shadow-sm transition-all ease-in-out duration-100 flex items-center justify-center gap-3 py-3 px-8 rounded-3xl bg-blue text-md text-tan font-medium outline-none border-none`}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};




export {
  ButtonOutlinedWhite,
  ButtonOutlinedBlue,
  ButtonSolid,
  StandardLightBlueButton,
  StandardBlueButton,
};
