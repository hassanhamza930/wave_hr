function FormLayout(props:any) {

    const {children}= props;
    return (  
        <div  className="bg-tan pl-[15%] w-[50%] justify-start items-start flex flex-col text-left">
                {children}
        </div>
    );
}

export default FormLayout;