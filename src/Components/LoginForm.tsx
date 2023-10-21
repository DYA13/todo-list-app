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

  const handleLogin = () => {
    onLogin(username, password)
  }

  const handleRegister = () => {
    onRegister(username, password)
  }

  return (
    <div className='container-login'>
      {user ? (
        <>
          <h2 className='welcome'>Добро пожаловать, {user}!</h2>
          <button className='btn' onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <>
          <h2 className='title'>
            {isRegistering
              ? "Пожалуйста зарегистрируйтесь для входа в Список задач! "
              : "Пожалуйста, введите свой логин и пароль для входа в Список задач!"}
          </h2>
          <div className='input-box'>
            <input
              className='login-input'
              type='text'
              placeholder='Email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='login-input'
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='btn'
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Зарегистрироваться" : "Войти"}
          </button>
          <button
            className='btn'
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Войти" : "Зарегистрироваться"}
          </button>
        </>
      )}
    </div>
  )
}

export default LoginForm
