function PageLayout(props:any) {
    const { children } = props;
    
    return (
        <div className="pt-[50px] h-full w-full flex flex-col justify-center items-center">
            {children}
        </div>
      );
}

export default PageLayout;