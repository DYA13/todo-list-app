import React, { useEffect } from "react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface LocalStorageTodoManagerProps {
  initialTodos: Todo[]
  onTodosChange: (todos: Todo[]) => void
}

const LocalStorageTodoManager: React.FC<LocalStorageTodoManagerProps> = ({
  initialTodos,
  onTodosChange
}) => {
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]")
    onTodosChange(storedTodos)
  }, [onTodosChange])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(initialTodos))
  }, [initialTodos])

  return null
}

export default LocalStorageTodoManager
