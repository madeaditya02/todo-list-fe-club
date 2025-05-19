import { useState } from "react";
import Button from "./components/Button";
import InputForm from "./components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const submitLogin = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      })
      if (res.data.token) {
        document.cookie = `todo_login=${res.data.token}`
        return navigate('/')
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="w-2xl mx-auto mt-20 max-w-full">
      <h1 className="font-semibold text-5xl text-center mb-10">Login</h1>
      <form action="" onSubmit={submitLogin}>
        <InputForm label="Username" type="text" onChange={(event) => setUsername(event.target.value)} />
        <InputForm label="Password" type="password" onChange={(event) => setPassword(event.target.value)} className="mt-5" />
        <Button className="mt-6 w-full">Login</Button>
      </form>
    </div>
  )
}