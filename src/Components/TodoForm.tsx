import React, { useState } from "react"

interface TodoFormProps {
  addTodo: (text: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [inputText, setInputText] = useState<string>("")

  const handleAddTodo = () => {
    if (inputText.trim() === "") return
    addTodo(inputText)
    setInputText("")
  }

  return (
    <div className='container-add-todo'>
      <input
        className='add-todo-input'
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Добавить задачу'
      />
      <button className='add-todo-button ' onClick={handleAddTodo}>
        Добавить
      </button>
    </div>
  )
}

export default TodoForm
