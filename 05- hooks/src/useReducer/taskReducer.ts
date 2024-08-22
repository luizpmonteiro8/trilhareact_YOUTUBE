// Define o tipo para as ações
type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

// Define o tipo do estado
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

// Define o estado inicial
export const initialState: State = {
  tasks: [],
};

// Função reducer para gerenciar as ações
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1,
        text: action.payload,
        completed: false,
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};
