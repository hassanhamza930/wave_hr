interface ButtonInputs{
    text:string,
    onClick:Function,
    customStyles?:string
}

function ButtonOutlinedWhite(props:ButtonInputs) {
    return (
        <button type={"submit"} onClick={()=>{props.onClick()}} className={`${props.customStyles} font-bold flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-2 border-tan hover:bg-tan hover:text-blue text-tan rounded-md `}>
            {props.text}
        </button>
      );
}


function ButtonSolid(props:ButtonInputs) {
    return (
        <button type="submit" onClick={()=>{props.onClick()}} className={` hover:text-tan hover:bg-purp text-tan font-bold flex flex-row gap-5 justify-center items-center px-8 py-2 bg-blue/90 rounded-md ${props.customStyles}`}>
            {props.text}
        </button>
      );
}



export {ButtonOutlinedWhite,ButtonSolid};