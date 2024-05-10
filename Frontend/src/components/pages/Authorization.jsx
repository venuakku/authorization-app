import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

function Authorization() {
    const [param, setParam] = useSearchParams();

    const currentID = param.get('id');

    useEffect(() => {
        fetch('http://localhost:3000/authorization/', {
            method: "PUT",
            body: JSON.stringify({
                id: currentID,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(async (res) => {
            const json = await res.json();
        })
    }, [])

    return(
        <div className="grid grid-rows-12 min-w-max h-screen">
            <div className="bg-white row-span-8">
                <h1 className="text-center text-5xl m-10 font-semibold text-blue-900">Authorization Successfull</h1>
                <h3 className="text-center text-3xl m-5 text-blue-950">Your Email has been verified </h3>
                <p className='mt-5 text-center text-lg text-blue-950'>You can now Sign in using your verified email. Click here to <Link to='/login'><span className='font-semibold' style={{textDecoration: 'underline'}}>Sign In</span></Link></p>
            </div>
            <div className="bg-blue-900 row-span-4 hidden md:block"></div>
        </div>
    );
}

export default Authorization;