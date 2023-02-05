function PageLayout(props: any) {
    const { children } = props;

    return (
        <div className="pt-[80px] bg-tan h-screen w-full flex flex-col justify-start items-start ">
            <div className="px-[10%] pt-5 bg-tan  w-full flex-col justify-start items-start overflow-y-scroll ">
                {children}
            </div>
        </div>

    );
}

export default PageLayout;