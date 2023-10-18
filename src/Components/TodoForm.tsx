import React, { useState } from "react"

interface TodoFormProps {
  addTodo: (text: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [inputText, setInputText] = useState<string>("")

  const handleAddTodo = () => {
    if (inputText.trim() === "") return
    addTodo(inputText)
    setInputText("") // Clear the input field after adding the todo
  }

  return (
    <div>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Add a new todo'
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default TodoForm
