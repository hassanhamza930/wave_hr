interface ButtonInputs{
    text:string,
    onClick:Function
}

function ButtonOutlined(props:ButtonInputs) {
    return (
        <button type={"submit"} onClick={()=>{props.onClick()}} className="mt-6 hover:text-tan text-blue font-bold flex flex-row gap-5 justify-center items-center px-8 py-2 bg-transparent border-2 border-blue hover:bg-blue/90 rounded-md">
            {props.text}
        </button>
      );
}


function ButtonSolid(props:ButtonInputs) {
    return (
        <button type="submit" onClick={()=>{props.onClick()}} className="mt-6 hover:text-tan hover:bg-purp text-tan  font-bold flex flex-row gap-5 justify-center items-center px-8 py-2 bg-blue/90 rounded-md">
            {props.text}
        </button>
      );
}



export {ButtonOutlined,ButtonSolid};