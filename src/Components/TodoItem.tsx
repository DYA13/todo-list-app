import React from "react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export type TodoItemPropsWithComplete = {
  todo: Todo
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  completeTask: (id: number) => void
}

const TodoItem: React.FC<TodoItemPropsWithComplete> = ({
  todo,
  toggleTodo,
  deleteTodo,
  completeTask
}) => {
  return (
    <li>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      {!todo.completed && (
        <button onClick={() => completeTask(todo.id)}>Complete</button>
      )}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem
