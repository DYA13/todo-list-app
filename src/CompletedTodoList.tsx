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
  // Filter out any completed tasks that have not already been added to the completed list
  const filteredCompletedTodos = completedTodos.filter(
    (todo) => !completedTodos.some((ct) => ct.id === todo.id)
  )

  return (
    <ul>
      {filteredCompletedTodos.map((todo) => (
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
