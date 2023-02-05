function FormLayout(props:any) {

    const {children}= props;
    return (  
        <div className="bg-tan pl-[5%] w-[60%] justify-start items-start flex flex-col text-left">
                {children}
        </div>
    );
}

export default FormLayout;