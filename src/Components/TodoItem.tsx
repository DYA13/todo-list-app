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
    <li className='li'>
      <input
        className='checkbox'
        type='checkbox'
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>

      {!todo.completed && (
        <button className='btn-todo' onClick={() => completeTask(todo.id)}>
          Выполнить
        </button>
      )}
      <button className='btn-todo' onClick={() => deleteTodo(todo.id)}>
        Удалить
      </button>
    </li>
  )
}

export default TodoItem
