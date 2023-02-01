interface HeadingInterface{
    text:string,
    color?:string,
    customStyles?:string
}

function Heading({color="text-blue",text,customStyles=""}:HeadingInterface) {
    return ( 
        <div className={`${color} ${customStyles}  text-4xl font-bold`}>
            {text}
        </div>
     );
}

function SubHeading({color="text-blue",text,customStyles=""}:HeadingInterface) {
    return ( 
        <div className={`${color} ${customStyles} text-md`}>
            {text}
        </div>
     );
}


function Text({color="text-blue",text,customStyles=""}:HeadingInterface) {
    return ( 
        <div className={`${color} ${customStyles} text-sm`}>
            {text}
        </div>
     );
}

export {Heading,SubHeading};