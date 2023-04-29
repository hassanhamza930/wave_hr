function PublicFacingLayout(props: any) {
  const { children } = props;

  return (
    <div className={`${props.customStyles} relative pt-[70px] min-h-screen w-full flex flex-col justify-start items-start`}>
      <div className='relative px-[20%] pb-20 pt-5 w-full h-full flex-1 flex-col justify-start items-start'>
        {children}
      </div>
    </div>
  );
}

export default PublicFacingLayout;
