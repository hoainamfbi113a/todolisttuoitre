import { useRef, createContext, useState, useEffect } from "react";
import {Form, Modal, message, Spin } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

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

  useEffect(() => {
    getTodo();
  }, []);

  function getTodo() {
    setIsLoading(true);
    fetch(todoAPI)
      .then((response) => response.json())
      .then((tasks) => {
        setIsLoading(false);
        setTasks(tasks);
      });
  }

  function addTodo(todo) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    fetch(todoAPI, options).then((response) => getTodo());
  }

  function deleteTodo(id) {
    var options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(todoAPI + "/" + id, options);
  }

  function updateTodo(todo, changeComplete = false, toggleAll = "checkAll") {
    setIsUpdating(true);
    message.loading({
      content: "Updating...",
      key: "updating",
    });

    const updateTask = todo;
    if (updateTask) {
      if (changeComplete) {
        updateTask.completed = !todo.completed;
      }
      var options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      };
      fetch(todoAPI + "/" + todo.id, options)
        .then((response) => response.json())
        .then((response) => {
          getTodo();
          setIsUpdating(false);
          message.success({
            content: "Updated",
            key: "updating",
            duration: 2,
          });
        });
    } else {
      let promise = new Promise((resolve, reject) => {
        tasks.forEach((task) => {
          task.completed = toggleAll === "alreadyCheckedAll" ? false : true;
          var options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          };
          fetch(todoAPI + "/" + task.id, options);
        });
      });

      promise.then((resolve) => {
        console.log("done");
        setIsUpdating(false);
        message.success({
          content: "Updated",
          key: "updating",
          duration: 2,
        });
      });
    }
  }

  // custom config cho table
  let locale = {
    emptyText: isLoading ? <Spin size="large"></Spin> : "NO TASK LEFT :)",
  };

  const columns = [
    {
      key: "1",
      title: "Status",
      render: (item) => {
        return (
          <div style={{ textAlign: "center" }}>
            <input
              type="checkbox"
              onChange={() => handleSelect(item)}
              checked={item.completed}
            />
          </div>
        );
      },
      filters: [
        { text: "Completed", value: true },
        { text: "Uncomplete", value: false },
      ],
      onFilter: (value, item) => {
        return item.completed === value;
      },
    },
    {
      key: "2",
      width: 500,
      title: "Task",
      render: (item) => {
        if (item.completed) {
          return <h4 className="task-content done-task">{item.task}</h4>;
        } else {
          return <h4 className="task-content">{item.task}</h4>;
        }
      },
      sorter: (record1, record2) => {
        return record1.task.localeCompare(record2.task);
      },
    },
    {
      key: "3",
      title: "Level",
      width: 100,
      render: (item) => {
        if (item.level === 1) {
          return <span>Easy</span>;
        } else if (item.level === 2) {
          return <span>Medium</span>;
        } else {
          return <span>Hard</span>;
        }
      },
      sorter: (record1, record2) => {
        return record1.level - record2.level;
      },
    },
    {
      key: "4",
      title: "Actions",
      render: (item) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <EditOutlined onClick={() => handleEdit(item)} />
            <DeleteOutlined
              onClick={() => handleDelete(item)}
              style={{ color: "red" }}
            />
          </div>
        );
      },
    },
  ];

  const handleAdd = () => {
    if (taskInput.trim()) {
      const newTask = {
        task: taskInput,
        level: level === "Easy" ? 1 : level === "Medium" ? 2 : 3,
        completed: false,
      };
      addTodo(newTask);
      setTasks((prevState) => {
        return [...prevState, newTask];
      });
      setTaskInput("");
      inputRef.current.focus();
    } else {
      message.error({
        content: "Please type in your task",
        className: "message",
      });
    }
    setTaskIndex((prevState) => prevState + 1);
    form.resetFields();
  };

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteTodo(item.id);
        setTasks((prevState) => {
          return prevState.filter((task) => task.id !== item.id);
        });
        if (isSearching) {
          setSearchTasks((prevState) => {
            return prevState.filter((task) => task.id !== item.id);
          });
        }
      },
    });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingTask({ ...item });
    setEditingTaskLevel(item.level);
  };

  const handleChangeLevel = (item) => {
    if (item !== level) {
      setLevel(item);
    }
  };

  const handleSelect = (item) => {
    updateTodo(item, true);
    setTasks((prevState) => {
      return prevState.filter((task) => {
        if (task.id === item.id) {
          task.completed = !item.completed;
        }
        return true;
      });
    });
  };

  const data = [
    levels,
    todoAPI,
    haveCompletedTasks,
    tasks,
    setTasks,
    isLoading,
    setIsLoading,
    isUpdating,
    setIsUpdating,
    form,
    taskIndex,
    setTaskIndex,
    taskInput,
    setTaskInput,
    level,
    setLevel,
    isEditing,
    setIsEditing,
    editingTask,
    setEditingTask,
    editingTaskLevel,
    setEditingTaskLevel,
    isSearching,
    setIsSearching,
    searchTasks,
    setSearchTasks,
    inputRef,
    [form]
    
];

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
