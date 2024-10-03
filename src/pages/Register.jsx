import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Register() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const rePasswordRef = useRef()


  const navigate = useNavigate()


  // Validatsiyasi Gmaildi
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  // Validatsiyasi Passwordiki
  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    );
  };


  function validete() {

    if (usernameRef.current.value.length < 3) {
      alert("username xatolik mavjud")
      usernameRef.current.focus()
      usernameRef.current.style.outlineColor = "red"
      return false
    }
    if (!validateEmail(emailRef.current.value)) {
      alert("Emailda hatolik mavjud")
      emailRef.current.focus()
      emailRef.current.style.outlineColor = "red"
      return false
    }
    // if (!validatePassword(passwordRef.current.value)) {
    //   alert("Pasworda hatolik mavjud")
    //   passwordRef.current.focus()
    //   passwordRef.current.style.outlineColor = "red"
    //   return false
    // }

    if (passwordRef.current.value != rePasswordRef.current.value) {
      alert("Parolar mos kelmadi")
      return false
    }

    return true
  }


  function handleRegister(event) {
    event.preventDefault()

    const isValid = validete()
    if (!isValid) {
      return
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",


      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'User registered successfully!') {
          navigate("/login")
          usernameRef.current.value = ""
          emailRef.current.value = ""
          passwordRef.current.value = ""
          rePasswordRef.current.value = ""

        }

      })
      .catch((err) => {
        console.log(err);
      })






  }

  return (
    <div>
      <h1>REGISTR</h1>
      <form className='flex flex-col gap-4 max-w-xs mt-10 mx-auto'>
        <input className='input input-bordered input-primary w-full max-w-xs' ref={usernameRef} type="text" placeholder='Enter username...' />
        <input className='input input-bordered input-primary w-full max-w-xs' ref={emailRef} type="email" placeholder='Enter email...' />
        <input className='input input-bordered input-primary w-full max-w-xs' ref={passwordRef} type="password" placeholder='Enter password...' />
        <input className='input input-bordered input-primary w-full max-w-xs' ref={rePasswordRef} type="password" placeholder='Re enter password...' />

        <button className='btn btn-outline btn-success' onClick={handleRegister}>REGISTER</button>
        <Link to="/login">Login page...</Link>

      </form>
    </div>
  )
}

export default Register