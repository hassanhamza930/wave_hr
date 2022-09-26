import Page2 from '../components/Page2';
import Page3 from '../components/Page3';
import Page4 from '../components/Page4';
import Page5 from '../components/Page5';
import ShufflingImages from '../components/shufflingImages';


export default function LandingPage(){
    return(
        <div className="pt-[80px] h-full w-full flex flex-col justify-start items-center">

            <div className="mt-16 text-7xl text-purple font-bold text-center">Recruit for<br/>The Startup</div>
            <div className="text-xl mt-10 text-purple font-regular text-center"><b>Wave</b> takes the pain out of recruiting world class talent.</div>
        
            <ShufflingImages/>
            <Page2/>
            <Page3/>
            <Page4/>
            <Page5/>
            


        </div>
    )
}