

function PublicFacingLayout(props: any) {
    const { children } = props;

    return (
        <div className={`${props.customStyles} relative pt-[80px] h-screen w-full flex flex-col justify-start items-start`}>
            <div style={{zoom:0.9}} className="relative px-[20%] pb-20 pt-5 w-full h-full flex-1 flex-col justify-start items-start overflow-y-scroll ">
                {children}
                {/* <div className="mb-24">
                </div> */}
            </div>
        </div>
    );
}




export default PublicFacingLayout;