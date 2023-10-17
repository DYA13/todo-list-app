import React, { useState } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import CompletedTodoList from "./CompletedTodoList"
import LocalStorageTodoManager from "./LocalStorageTodoManager"
import "./App.css"

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)

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

    const taskToMove = todos.find((todo) => todo.id === id)
    if (taskToMove) {
      setCompletedTodos([...completedTodos, taskToMove])
    }
  }

  return (
    <div className='app'>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
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
      <LocalStorageTodoManager initialTodos={todos} onTodosChange={setTodos} />
    </div>
  )
}

export default App
