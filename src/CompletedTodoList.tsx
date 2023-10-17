import React from "react"
import TodoItem from "./TodoItem"

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface CompletedTodoListProps {
  completedTodos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  completeTask: (id: number) => void
}

const CompletedTodoList: React.FC<CompletedTodoListProps> = ({
  completedTodos,
  toggleTodo,
  deleteTodo,
  completeTask
}) => {
  return (
    <ul>
      {completedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          completeTask={completeTask}
        />
      ))}
    </ul>
  )
}

export default CompletedTodoList
