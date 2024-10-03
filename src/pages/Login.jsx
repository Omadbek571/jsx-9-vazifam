import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()


  const navigate = useNavigate()




  function validete() {
    if (usernameRef.current.value.length < 3) {
      alert("username xatolik mavjud")
      usernameRef.current.focus()
      usernameRef.current.style.outlineColor = "red"
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
      password: passwordRef.current.value,
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
      method: "POST",


      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.message == "User Not found" || data.message == "Invalid Password!") {
          usernameRef.current.style.outlineColor = "red"
          passwordRef.current.style.outlineColor = "red"
        }
        if (data.id) {
          localStorage.setItem("token", data.accessToken)
          localStorage.setItem("user", JSON.stringify(data))
          navigate("/")

          usernameRef.current.value = "";
          passwordRef.current.value = "";
        }

      })
      .catch((err) => {
        console.log(err);
      })






  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form className='flex flex-col gap-4 max-w-xs mt-10 mx-auto'>
        <input className='input input-bordered input-primary w-full max-w-xs' ref={usernameRef} type="text" placeholder='Enter username...' />
        <input className='input input-bordered input-primary w-full max-w-xs' ref={passwordRef} type="password" placeholder='Enter password...' />
        <button className='btn btn-outline btn-success' onClick={handleRegister}>LOGIN</button>
        <Link to="/register">Register page...</Link>
      </form>
    </div>
  )
}

export default Login