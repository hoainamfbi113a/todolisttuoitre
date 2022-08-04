import "./App.css";
import { Button, Form, Input, Table, Modal, message, Progress, Select, Spin,
} from "antd";
import { useState, useRef, useEffect, useContext } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { AppContext } from "./AppContext";

function App2() {
  const context = useContext(AppContext);
  const [form] = Form.useForm();

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1 style={{ color: "white", margin: "0" }}>TO-DO LIST</h1>
        </header>

        <main>
          <div className="add-section">
            <Form className="form" form={form}>
              <Form.Item name="add-input">
                <Input
                  placeholder="Enter task"
                  allowClear
                  // required
                  autoFocus={true}
                  ref={context.inputRef}
                  value={context.taskInput}
                  onChange={(e) => {
                    // gọi hàm setTaskInput bên file actions và truyền vô payload
                    return context.setTaskInput(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  defaultValue={context.level}
                  style={{ minWidth: "100px" }}
                  onChange={(item) => context.handleChangeLevel(item)}
                >
                  {context.levels.map((item, index) => {
                    return (
                      <Select.Option key={index} value={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    context.handleAdd();
                    form.resetFields();
                  }}
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="search-section">
            {context.isSearching && (
              <Input
                className="search-input"
                placeholder="Search..."
                autoFocus={true}
                allowClear
                onChange={(e) => {
                  if (e.target.value === "") {
                    context.setSearchTasks([]);
                  } else {
                    const qualifiedTasks = context.tasks.filter((task) =>
                      task.task.includes(e.target.value)
                    );
                    context.setSearchTasks(qualifiedTasks);
                  }
                }}
              />
            )}
            <Button
              shape="circle"
              icon={
                context.isSearching ? <CloseOutlined /> : <SearchOutlined />
              }
              style={{ backgroundColor: "violet", color: "white" }}
              onClick={() => {
                if (context.isSearching) {
                  context.setSearchTasks([]);
                }
                context.setIsSearching(!context.isSearching);
              }}
            />
          </div>
        </main>

        <Table
          className="tasks-table"
          locale={context.locale}
          columns={context.columns}
          dataSource={
            context.searchTasks.length === 0
              ? context.tasks
              : context.searchTasks
          }
          // lấy trong dataSource cột 'id' để làm key cho từng row
          rowKey="id"
          rowClassName={(item) =>
            item.completed ? "table-row-completed" : "table-row-uncompleted"
          }
          pagination={{
            pageSize: 6,
          }} // mỗi trang nhiều nhất 10 tasks
        ></Table>

        <footer className="footer">
          <Progress
            type="circle"
            percent={
              (context.tasks.filter((task) => task.completed).length /
                context.tasks.length) *
              100
            }
            format={() => {
              const completedTasks = context.tasks.filter(
                (task) => task.completed
              ).length;
              return `${completedTasks} / ${context.tasks.length}`;
            }}
          />

          <div className="buttons">
            <Button
              className="check-all-btn"
              onClick={() => {
                const alreadyCheckedAll = context.tasks.every(
                  (task) => task.completed === true
                );
                if (context.tasks.length === 0) {
                  message.info({
                    content: "No Task Yet",
                    className: "message",
                  });
                } else if (alreadyCheckedAll) {
                  context.updateTodo(undefined, false, "alreadyCheckedAll");
                  context.setTasks((prevState) => {
                    return prevState.map((task) => ({
                      ...task,
                      completed: false,
                    }));
                  });
                } else {
                  context.updateTodo(undefined, false);
                  context.setTasks((prevState) => {
                    return prevState.map((task) => ({
                      ...task,
                      completed: true,
                    }));
                  });
                }
              }}
            >
              Check All Tasks
            </Button>
            {context.haveCompletedTasks ? (
              <Button
                className="clear-all-btn"
                type="danger"
                onClick={() => {
                  const doneTasks = context.tasks.filter(
                    (task) => task.completed === true
                  );
                  doneTasks.forEach((doneTask) =>
                    context.deleteTodo(doneTask.id)
                  );
                  context.setTasks((prevState) => {
                    return prevState.filter((task) => task.completed === false);
                  });
                }}
              >
                Clear All Completed Task
              </Button>
            ) : (
              <></>
            )}
          </div>
        </footer>
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
