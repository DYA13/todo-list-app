import React from "react"
import TodoItem from "./TodoItem"

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  completeTask: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  completeTask
}) => {
  return (
    <ul>
      {todos.map((todo) => (
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

export default TodoList
