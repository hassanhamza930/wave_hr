import GoogleButton from 'react-google-button'
import useHandleGoogleSignIn from '../logic/useHandleGoogleSignIn'



export default function Login() {
    
    const {handleGoogleSignIn}= useHandleGoogleSignIn();
    
    return (
        <div className="bg-tan h-screen w-full">
            <div className="bg-tan h-screen w-full flex justify-center items-center p-20">

                <div className="flex h-full w-full flex-row justify-center items-center">

                    <div className="w-2/4 h-full flex justify-center items-start p-20 flex-col ">
                        <div className="text-7xl font-bold text-purple text-start">
                            Let's get <br></br>you started
                        </div>
                        <div className="text-xl mt-10 font-regular text-purple text-start">
                            Use google to sign in and create an account in seconds.
                        </div>

                        <GoogleButton
                        className="mt-20"
                            onClick={() => { handleGoogleSignIn() }}
                        />



                    </div>


                    <div className="relative w-2/4 h-full flex justify-center items-center">
                        <div className='absolute z-0 h-3/4 w-3/4 rounded-xl bg-purple bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")]'></div>
                        
                        <div className='text-white/80 absolute z-10 h-3/4 w-3/4 rounded-xl bg-gradient-to-bl from-bray/80 to-bray flex flex-col justify-start items-start p-10 py-20'>
                            <div className="text-4xl font-bold">Hiring for the startup</div>
                            <div className="text-xl font-bold mt-2"> has never been this easy</div>

                            <div className="text-md font-regular mt-5">Wave allows you to focus on the stuff that you're really good at, Building great products. We take care of the repetitive stuff with automation. </div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}