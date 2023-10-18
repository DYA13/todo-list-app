// LoginForm.tsx
import React, { useState } from "react"
import "../styles/App.css"

interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  onRegister: (username: string, password: string) => void
  onLogout: () => void
  user: string | null
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onRegister,
  onLogout,
  user
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  console.log("User prop in LoginForm:", user)
  const handleLogin = () => {
    onLogin(username, password)
  }

  const handleRegister = () => {
    onRegister(username, password)
  }

  return (
    <div>
      {user ? ( // If a user is authenticated, render the logout button
        <>
          <h2 className='welcome'>Welcome, {user}!</h2>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        // If no user is authenticated, render the login/registration form
        <>
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
        </>
      )}
    </div>
  )
}

export default LoginForm
