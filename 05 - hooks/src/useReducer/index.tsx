import { useReducer, useState } from "react";
import { initialState, reducer } from "./taskReducer";

const TaskApp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch({ type: "ADD_TASK", payload: taskText });
      setTaskText("");
    }
  };

  const handleRemoveTask = (id: number) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  };

  const handleToggleTask = (id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Adicionar tarefa"
      />
      <button onClick={handleAddTask}>Adicionar tarefa</button>
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleRemoveTask(task.id)}>
              Remover tarefa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
