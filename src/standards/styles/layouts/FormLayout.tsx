function FormLayout(props:any) {

    const {children}= props;
    return (  
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">
            <div  className="w-[80%] flex justify-start items-start pl-[5%] pr-[50%] flex-col h-full bg-transparent rounded-md p-10">
                {children}
            </div>

        </div>
    );
}

export default FormLayout;