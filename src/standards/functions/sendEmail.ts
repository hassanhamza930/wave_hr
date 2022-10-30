

export default function sendEmail(sendTo:string,subject:string,emailBody:string){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };

    fetch(`https://wavefunc.vercel.app/sendEmail?sendTo=${sendTo}&emailBody=${emailBody}&subject=${subject}`, requestOptions)
    .then((response)=>{console.log(response)});

}