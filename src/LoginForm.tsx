// LoginForm.tsx
import React, { useState } from "react"

interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  onRegister: (username: string, password: string) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = () => {
    onLogin(username, password)
  }

  const handleRegister = () => {
    onRegister(username, password)
  }

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  )
}

export default LoginForm
