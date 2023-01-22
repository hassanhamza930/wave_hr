import GoogleButton from 'react-google-button'
import useHandleGoogleSignIn from '../logic/useHandleGoogleSignIn'



export default function Login() {
    
    const {handleGoogleSignIn}= useHandleGoogleSignIn();
    
    return (
        <div className="bg-tan h-screen w-full">
            <div className="bg-tan h-screen w-full flex justify-center items-center p-20">

                <div className="flex h-full w-full flex-row justify-center items-center">

                    <div className="w-2/4 h-full flex justify-center items-start p-20 flex-col ">
                        <div className="text-7xl font-bold text-black text-start">
                            Let's get <br></br>you started
                        </div>
                        <div className="text-xl mt-10 font-regular text-black text-start">
                            Use google to sign in and create an account in seconds.
                        </div>

                        <GoogleButton
                        className="mt-20"
                            onClick={() => { handleGoogleSignIn() }}
                        />



                    </div>


                    <div className="relative w-2/4 h-full flex justify-center items-center">
                        <div className='-mb-36 -mr-36 absolute z-10 h-[350px] w-[350px] rounded-xl bg-blue bg-cover bg-start bg-[url("https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/how_to_accept_job_offerA.png")]'></div>
                        <div className='-mt-36 -ml-36 absolute z-0 h-[350px] w-[350px] rounded-xl bg-blue bg-cover bg-start bg-[url("https://blog.close.com/content/images/2021/01/sales-hiring-101-for-startups.jpg")]'></div>

                    </div>


                </div>

            </div>
        </div>
    )
}