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
      {user ? (
        <>
          <h2 className='welcome'>Добро пожаловать, {user}!</h2>
          <button onClick={onLogout}>Выйти</button>
        </>
      ) : (
        <>
          <h2>
            {isRegistering
              ? "Пожалуйста зарегистрируйтесь для входа в Список задач! "
              : "Пожалуйста, введите свой логин и пароль для входа в Список задач!"}
          </h2>
          <input
            type='text'
            placeholder='Email'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={isRegistering ? handleRegister : handleLogin}>
            {isRegistering ? "Зарегистрироваться" : "Войти"}
          </button>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Войти" : "Зарегистрироваться"}
          </button>
        </>
      )}
    </div>
  )
}

export default LoginForm
