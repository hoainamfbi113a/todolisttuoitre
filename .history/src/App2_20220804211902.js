import "./App.css";
import { Button, Form, Input, Table, Modal, message, Progress, Select, Spin,} from "antd";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App2() {
  const context = useContext(AppContext);

  return (
    <div className="App">
      <div className="wrapper">
        <Header/>

        <Content />
        
      </div>

      {/* edit modal */}
      <Modal
        title="Edit Task"
        visible={context.isEditing}
        onCancel={() => {
          context.setIsEditing(false);
          context.setEditingTask();
        }}
        okText="Save"
        onOk={() => {
          context.updateTodo({
            id: context.editingTask.id,
            task: context.editingTask.task,
            level: context.editingTaskLevel,
            completed: context.editingTask.completed,
          });
          context.setTasks((prevState) => {
            return prevState.map((task) => {
              if (task.id === context.editingTask.id) {
                context.editingTask.level = context.editingTaskLevel;
                return context.editingTask;
              } else {
                return task;
              }
            });
          });
          if (context.isSearching) {
            context.setSearchTasks((prevState) => {
              return prevState.map((task) => {
                if (task.id === context.editingTask.id) {
                  task.level = context.editingTaskLevel;
                  task.task = context.editingTask.task;
                }
                return task;
              });
            });
          }
          context.setIsEditing(false);
        }}
      >
        <Input
          value={context.editingTask?.task}
          autoFocus={true}
          onChange={(e) => {
            context.setEditingTask((prevState) => {
              return { ...prevState, task: e.target.value };
            });
          }}
        />
        <Select
          value={
            context.editingTaskLevel === 1
              ? "Easy"
              : context.editingTaskLevel === 2
              ? "Medium"
              : "Hard"
          }
          style={{ minWidth: "100px" }}
          onChange={(item) =>
            context.setEditingTaskLevel(
              item === "Easy" ? 1 : item === "Medium" ? 2 : 3
            )
          }
        >
          {context.levels.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>
    </div>
  );
}

export default App2;
