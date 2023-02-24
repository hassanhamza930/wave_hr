interface ButtonInputs{
    text:string,
    onClick:Function,
    customStyles?:string
}

function ButtonOutlinedWhite(props:ButtonInputs) {
    return (
        <button type={"submit"} onClick={()=>{props.onClick()}} className={`${props.customStyles} hover:font-bold font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-[1px] border-tan hover:bg-tan text-sm hover:text-blue text-tan rounded-md `}>
            {props.text}
        </button>
      );
}

function ButtonOutlinedBlue(props:ButtonInputs) {
    return (
        <button type={"submit"} onClick={()=>{props.onClick()}} className={`${props.customStyles} hover:font-bold font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-[1px] border-blue hover:bg-blue text-sm hover:text-tan text-blue rounded-md `}>
            {props.text}
        </button>
      );
}




function ButtonSolid(props:ButtonInputs) {
    return (
        <button type="submit" onClick={()=>{props.onClick()}} className={` hover:text-tan hover:shadow-xl text-tan font-regular flex flex-row gap-5 justify-center items-center px-8 py-2 bg-blue hover:bg-black rounded-md text-sm ${props.customStyles}`}>
            {props.text}
        </button>
      );
}



export {ButtonOutlinedWhite,ButtonOutlinedBlue,ButtonSolid};