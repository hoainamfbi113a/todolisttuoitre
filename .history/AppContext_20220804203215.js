import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const levels = ["Easy", "Medium", "Hard"];
  const todoAPI = "https://62e399ac3c89b95396cbd5c2.mockapi.io/dawnny/todo";

  // các task
  const [tasks, setTasks] = useState([]);
  const haveCompletedTasks = tasks.some((task) => task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef();
  const [form] = Form.useForm();
  const [taskIndex, setTaskIndex] = useState(0);
  // task đang được type để add
  const [taskInput, setTaskInput] = useState("");
  // mức độ khó dễ của task, mỗi khi chọn 1 option khác trong dropdown menu thì set state lại
  const [level, setLevel] = useState("Easy");
  // có đang edit hay không (mở tắt modal)
  const [isEditing, setIsEditing] = useState(false);
  // task đang được edit
  const [editingTask, setEditingTask] = useState();
  const [editingTaskLevel, setEditingTaskLevel] = useState();
  // nếu được bấm nút search
  const [isSearching, setIsSearching] = useState(false);
  const [searchTasks, setSearchTasks] = useState([]);
  return <AppContext.Provider>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
