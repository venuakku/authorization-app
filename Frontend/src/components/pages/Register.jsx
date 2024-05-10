import React, { useEffect, useState } from 'react'
import Input from '../elements/Input'
import Side from '../SideComponent/Side'
import { Link, useNavigate } from 'react-router-dom'
import Label from '../elements/Label'
import Button from '../elements/Button'
import validator from 'validator'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(null)
  const [noName, setNoName] = useState(null)
  const [noEmail, setNoEmail] = useState(null)
  const [hidden, setHidden] = useState(false)
  const [sameEmail, setSameEmail] = useState(false)
  const [created, setCreated] = useState(false)
  const navigate = useNavigate()

  function handlePassword() {
    setHidden((prevState) => {
      return !prevState;
    });
  }

  function validate(value) {
    if (validator.isStrongPassword(value, { 
      minLength: 8, minLowercase: 1, 
      minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
      setValidPassword(true);
    } else { 
      setValidPassword(false);
      return
  } 
  }

  function getName(e) {
    setNoName(false)
    setName(e.target.value)
  }

  function getEmail(e) {
    setNoEmail(false)
    setSameEmail(false)
    setEmail(e.target.value)
  }

  function getPassword(e) {
    setPassword(e.target.value)
  }

  function strongPassword() {
    setFocus(true)
  }

  function hideStrongPassword() {
    setFocus(false)
    validate(password)
  }

  function handleClick() {

    if( name == '' ) {
      setNoName(true);
      return
    }

    function validateEmail(email) {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return pattern.test(email);
    }

    if(!validateEmail(email)) {
      setNoEmail(true);
      return
    }

    if( password == '' ) {
      setFocus(true)
      return
    }

    if(validPassword) {
      setFocus(false);
    } else if(!validPassword) {
      setFocus(true);
      return
    }

    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email.toLowerCase(),
        password: password
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then( async (res) => {
      const response = await res.json();
      if(response == 'user created') {
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
        }, 3000)
      } else if (response == 'email already exist') {
        setSameEmail(true);
      }
    })
 
    setName("");
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
        <pre>{created ? `User Account Created \nVerify your email to login`: null}</pre>
        <h1 className='text-4xl m-3 font-bold mb-10 ml-0 text-blue-950'>Sign up</h1>
        <Label text='Name' />
        <Input type='text' value={name} onChange={getName} />
        <pre className=''>{noName ? "Please fill out this field" : null}</pre>
        <Label text='Email' />
        <Input type='email' value={email} onChange={getEmail} />
        <pre>{noEmail ? "Please enter valid email" : null}</pre>
        <pre>{sameEmail ? "Email already exist" : null}</pre>
        <Label text='Password' />
        <Input type={hidden ? "text" : "password"} value={password} placeholder='password' onChange={getPassword} onBlur={hideStrongPassword} onFocus={strongPassword} />
        <input type='checkbox' unchecked onClick={handlePassword} className='mt-3 mx-2 h-5 w-5'></input><span className='text-lg'>Show Password</span>
        <pre className=''>{isFocus ? "Password should contain atleast 8 characters\nOne Lowercase One Uppercase One Number\nand One Symbol" : null }</pre>
        <Button text='Create Account' onClick={handleClick} />
        <p className='ml-11 text-blue-950'>Already have an account? <Link to='/login'><span className='font-semibold' style={{textDecoration: 'underline'}}>Sign In</span></Link></p>
      </div>
    </div>
  )
}

export default Register