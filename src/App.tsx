import React, { useState, useEffect } from "react"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import CompletedTodoList from "./Components/CompletedTodoList"
import LocalStorageTodoManager from "./Components/LocalStorageTodoManager"
import "./styles/App.css"
import LoginForm from "./Components/LoginForm"

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [user, setUser] = useState<string | null>(null)

  // Load user data from local storage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(storedUser)
      // Load user-specific todos from local storage
      const userTodos = JSON.parse(
        localStorage.getItem(`todos_${storedUser}`) || "[]"
      )
      setTodos(userTodos)
    }
  }, [])

  const handleLogin = (username: string, password: string) => {
    // Retrieve stored users from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Find the user with the matching username
    const foundUser = storedUsers.find(
      (userItem: { username: string }) => userItem.username === username
    )

    if (foundUser && foundUser.password === password) {
      // Authentication successful
      setUser(username)
      localStorage.setItem("user", username)
      // Load user-specific todos from local storage
      const userTodos = JSON.parse(
        localStorage.getItem(`todos_${username}`) || "[]"
      )
      setTodos(userTodos)
    } else {
      alert("Invalid username or password.")
    }
  }

  const handleRegister = (username: string, password: string) => {
    // Check if the user already exists in local storage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")

    if (
      storedUsers.some(
        (user: { username: string }) => user.username === username
      )
    ) {
      alert("Username already exists. Please choose another.")
    } else {
      // Add the new user to the local storage
      const newUser = { username, password }
      storedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUsers))

      setUser(username)
      localStorage.setItem("user", username)
      // Initialize the user's todos with an empty array
      setTodos([])
    }
  }
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addTodo = (text: string) => {
    // Check if the item already exists in the todo list
    if (todos.some((todo) => todo.text === text)) {
      alert("This item already exists in the todo list.")
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])

    // Store the user's updated todo list in local storage
    if (user) {
      localStorage.setItem(`todos_${user}`, JSON.stringify([...todos, newTodo]))
    }
  }

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
    // Store the user's updated todo list in local storage
    if (user) {
      localStorage.setItem(`todos_${user}`, JSON.stringify(updatedTodos))
    }
  }

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    // Store the user's updated todo list in local storage
    if (user) {
      localStorage.setItem(`todos_${user}`, JSON.stringify(updatedTodos))
    }

    // If the deleted task was in the completed list, remove it from there as well
    const updatedCompletedTodos = completedTodos.filter(
      (todo) => todo.id !== id
    )
    setCompletedTodos(updatedCompletedTodos)
  }

  const completeTask = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    )
    setTodos(updatedTodos)
    // Store the user's updated todo list in local storage
    if (user) {
      localStorage.setItem(`todos_${user}`, JSON.stringify(updatedTodos))
    }

    const taskToMove = todos.find((todo) => todo.id === id)
    if (taskToMove) {
      setCompletedTodos([...completedTodos, taskToMove])
    }
  }

  return (
    <div className='app'>
      {user ? (
        // Render the todo list if a user is authenticated
        <>
          <h1>Todo List</h1>
          <TodoForm addTodo={addTodo} />
          <button onClick={handleLogout}>Logout</button>{" "}
          {/* Move the logout button here */}
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            completeTask={completeTask}
          />
          <CompletedTodoList
            completedTodos={completedTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            completeTask={completeTask}
          />
          <LocalStorageTodoManager
            initialTodos={todos}
            onTodosChange={setTodos}
          />
        </>
      ) : (
        // Render the login/registration form if no user is authenticated
        <LoginForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
          user={user}
        />
      )}
    </div>
  )
}

export default App
