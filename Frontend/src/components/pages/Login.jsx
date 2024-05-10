import React, { useEffect, useState } from 'react'
import Register from './Register'
import Input from '../elements/Input'
import Side from '../SideComponent/Side'
import Label from '../elements/Label'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../elements/Button'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [verified , setVerified] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [noPassword, setNoPassword] = useState(false);
 
    let navigate = useNavigate();

    let path = '/home/';

    function handlePassword() {
      setHidden((prevState) => {
        return !prevState;
      });
    }

    function getEmail(e) {
        setNoEmail(false);
        setVerified(false);
        setIncorrectEmail(false);
        setEmail(e.target.value);
    }

    function getPassword(e) {
      setNoPassword(false)
        setPassword(e.target.value);
    }

    function handleClick() {

      function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return pattern.test(email);
      }
  
      if(!validateEmail(email)) {
        setNoEmail(true);
        return
      }

        fetch('http://localhost:3000/login/',{
           method: 'POST',
           body: JSON.stringify({
            email: email,
            password: password
           }),
           headers: {
            'Content-type': 'application/json'
           } 
        })
        .then(async(res) => {
            const json = await res.json();
            if(json == "success") {
                sessionStorage.setItem("user", json)
                navigate(path,{state:{id:email}});
            } else if(json == "wrong password") {
                setNoPassword(true);
            } else if(json == "email does not exists") {
                setIncorrectEmail(true);
            } else if (json == "email is not verified") {
                setVerified(true);
            }
        })

        setEmail("");
        setPassword("");
    }
  
    useEffect(() => {
      if(sessionStorage.getItem("user")){
        navigate("/home")
      }
    }, [])

  return (
    <div className='grid grid-cols-12 min-w-max h-screen'>
      <div className='bg-blue-900 col-span-4 hidden lg:block h-full'>
        {/* <Side /> */}
      </div>
      <div className='col-span-8 ml-32 mt-10'>
        <h1 className='text-4xl m-3 font-bold mb-10 ml-0 text-blue-950'>Sign in</h1>
        <Label text='Email' />
        <Input type='text' onChange={getEmail} value={email} />
        <pre>{noEmail ? "Please enter valid email" : null}</pre>
        <pre>{verified ? "Email is not verified" : null}</pre>
        <pre>{incorrectEmail ? "Incorrect Email" : null}</pre>
        <Label text='Password' />
        <Input type={hidden ? "text" : "password"} placeholder='password' onChange={getPassword} value={password} />
        <input type='checkbox' onClick={handlePassword} className='mt-3 mx-2 h-5 w-5'></input><span className='text-lg'>Show Password</span>
        <pre>{noPassword ? "Incorrect Password" : null}</pre>
        <Button text="Sign in" onClick={handleClick} />
        <p className='ml-12 text-blue-950'>Don't have an account? <Link to='/'><span className='font-semibold' style={{textDecoration: 'underline'}}>Sign up</span></Link></p>
      </div>
    </div>
  )
}

export default Login