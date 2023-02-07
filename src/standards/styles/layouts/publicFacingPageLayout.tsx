//only the candidates would be able to see this type of page.

function PublicFacingPageLayout(props: any) {
    const { children } = props;

    return (
        <div className="relative h-screen w-full bg-blue flex justify-center items-center">
            <div id="no_scroll" className="pb-20 text-black w-full md:w-[70%] rounded-md h-full md:h-[90%] overflow-y-scroll flex-col justify-start items-start">
                {children}
            </div>
        </div>
    );
}


function PublicFacingPageLayoutWhite(props: any) {
    const { children } = props;

    return (
        <div className="relative h-screen w-full bg-tan flex justify-center items-center">
            <div id="no_scroll" className="pb-20 w-full md:w-[70%] rounded-md h-full md:h-[90%] overflow-y-scroll flex-col justify-start items-start">
                {children}
            </div>
        </div>
    );
}


export default PublicFacingPageLayout;

export {PublicFacingPageLayoutWhite}