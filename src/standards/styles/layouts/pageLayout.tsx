function PageLayout(props: any) {
    const { children } = props;

    return (
        <div className="pt-[80px] bg-tan h-screen w-full flex flex-col justify-start items-start">
            <div className="px-[1%] 2xl:px-[5%] pt-5 w-full h-full flex-1 flex-col justify-start items-start overflow-y-scroll ">
                {children}
                {/* <div className="mb-24">
                </div> */}
            </div>
        </div>

    );
}

export default PageLayout;