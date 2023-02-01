function PageLayout(props:any) {
    const { children } = props;
    
    return (
        <div className="pt-[50px] h-screen w-full flex justify-center items-center overflow-y-scroll">
            {children}
        </div>
      );
}

export default PageLayout;