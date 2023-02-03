function PageLayout(props:any) {
    const { children } = props;
    
    return (
        <div className="pt-[50px] h-full w-full flex justify-center items-center">
            {children}
        </div>
      );
}

export default PageLayout;