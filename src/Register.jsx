import { useState } from "react";
import Button from "./components/Button";
import InputForm from "./components/InputForm";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const submitForm = async (event) => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username: username,
        name: name,
        email: email,
        password: password
      })
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-2xl max-w-full mx-auto mt-20">
      <h1 className="text-5xl font-semibold text-center">Register</h1>
      <form action="" className="mt-10" onSubmit={submitForm}>
        <InputForm label="Username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <InputForm label="Name" placeholder="Full name" onChange={e => setName(e.target.value)} />
        <InputForm label="Email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <InputForm label="Password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <Button className="w-full mt-6">Register</Button>
      </form>
    </div>
  )
}