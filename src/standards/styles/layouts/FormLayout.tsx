function FormLayout(props:any) {

    const {children}= props;
    return (  
        <div className="h-full w-full bg-tan justify-center items-center flex flex-col text-left">
            <div id="no_scroll" className="w-[80%] flex-1  justify-start items-center px-20 flex-col h-[90%] bg-transparent rounded-md overflow-y-scroll p-10">
                {children}
            </div>

        </div>
    );
}

export default FormLayout;