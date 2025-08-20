import { useState } from "react"

const LoginForm = ({ handlelogin }) => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const submit = (event) => {
    event.preventDefault()
    handlelogin({ username, password })
    setusername('')
    setpassword('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input value={username} onChange={({ target }) => setusername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={({ target }) => setpassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
