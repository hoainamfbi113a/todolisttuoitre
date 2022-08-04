import './App.css';
import {Button, Form, Input, Table, Modal, message, Progress, Select, Spin } from 'antd'
import { useState, useRef, useEffect, useContext} from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { AppContext} from './AppContext'

function App2() {

    const context = useContext(AppContext)

  
  return (
    <div className="App">
      <div className="wrapper">
        <header>

          <h1 style={{color: 'white', margin: '0'}}>TO-DO LIST</h1>
        </header>

        <main>
          <div className="add-section">
            <Form className='form'>
              <Form.Item name="add-input" >
                <Input 
                  placeholder="Enter task"
                  allowClear
                  // required
                  autoFocus={true}
                  ref={inputRef}
                  value={taskInput}
                  onChange={e => {
                    // gọi hàm setTaskInput bên file actions và truyền vô payload
                    return setTaskInput(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Select defaultValue={level} style={{minWidth: '100px'}} onChange={item => handleChangeLevel(item)}>
                  {levels.map((item, index) => {
                    return <Select.Option key={index} value={item}>
                            {item}
                          </Select.Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  block 
                  onClick={handleAdd}
                  htmlType="submit" 
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="search-section">
            {
              isSearching &&
              <Input
                className='search-input'
                placeholder='Search...'
                autoFocus={true}
                allowClear
                onChange={e => {
                  if (e.target.value === '') {
                    setSearchTasks([])
                  }
                  else{
                    const qualifiedTasks = tasks.filter(task => task.task.includes(e.target.value));
                    setSearchTasks(qualifiedTasks)
                  }
                }}
              />
            }
            <Button 
              shape='circle' 
              icon={isSearching ? <CloseOutlined/> :<SearchOutlined/>}
              style={{ backgroundColor: 'violet', color: 'white' }}
              onClick = {() => {
                if (isSearching) {
                  setSearchTasks([])
                }
                setIsSearching(!isSearching);
              }}
            />
          </div>

        </main>

        <Table
          className='tasks-table'
          locale={locale}
          columns={columns}
          dataSource={searchTasks.length === 0 ? tasks : searchTasks} 
          // lấy trong dataSource cột 'id' để làm key cho từng row
          rowKey='id'
          rowClassName={(item) => item.completed ? 'table-row-completed' : 'table-row-uncompleted'}
          pagination={{
            pageSize: 6
          }}  // mỗi trang nhiều nhất 10 tasks

        >
          
        </Table>
        


        <footer className="footer">
          <Progress 
            type='circle' 
            percent={tasks.filter(task => task.completed).length / tasks.length * 100} 
            format={() => {
              const completedTasks = tasks.filter(task => task.completed).length
              return `${completedTasks} / ${tasks.length}`
            }}
          />
          
          <div className='buttons'>
            <Button
              className='check-all-btn'
              onClick={() => {
                const alreadyCheckedAll = tasks.every(task => task.completed === true)
                if (tasks.length === 0) {
                  message.info({
                    content:'No Task Yet',
                    className: 'message'
                  })
                }
                else if (alreadyCheckedAll) {
                  updateTodo(undefined, false, 'alreadyCheckedAll')
                  setTasks(prevState => {
                    return prevState.map(task => ({...task, completed: false})) 
                  })
                }
                else{
                  updateTodo(undefined, false)
                  setTasks(prevState => {
                    return prevState.map(task => ({...task, completed: true})) 
                  })
                }
              }}
            >
              Check All Tasks
            </Button>
            {
              haveCompletedTasks ?
              <Button 
                className='clear-all-btn'
                type='danger'
                onClick={() => {
                  const doneTasks = tasks.filter(task => task.completed === true)
                  doneTasks.forEach(doneTask => deleteTodo(doneTask.id))
                  setTasks(prevState => {
                    return prevState.filter(task => task.completed === false)
                  })
                }}
              >
                Clear All Completed Task
              </Button>
              : <></>
            }
          </div>

        </footer>
        

      </div>
      
      {/* edit modal */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false)
          setEditingTask()
        }}
        okText="Save"
        onOk={()=> {
          updateTodo({
            id: editingTask.id,
            task: editingTask.task,
            level: editingTaskLevel,
            completed: editingTask.completed,
          })
          setTasks(prevState => {
            return prevState.map(task => {
              if (task.id === editingTask.id) {
                editingTask.level = editingTaskLevel 
                return editingTask
              }
              else {
                return task
              }
            })
          })
          if (isSearching) {
            setSearchTasks(prevState => {
              return prevState.map(task => {
                if (task.id === editingTask.id) {
                  task.level = editingTaskLevel
                  task.task = editingTask.task
                  
                }
                return task
              })
            })
          }
          setIsEditing(false)
        }}
      >
        <Input 
          value={editingTask?.task}
          autoFocus={true}
          onChange= {e => {
            setEditingTask(prevState => {
              return { ...prevState, task: e.target.value }
            })
          }}
        />
        <Select 
          value={editingTaskLevel === 1 ? 'Easy' : editingTaskLevel === 2 ? 'Medium' : 'Hard'} 
          style={{minWidth: '100px'}} 
          onChange={item => setEditingTaskLevel(item === 'Easy' ? 1 : item === 'Medium' ? 2 : 3 ) }
        >
            {levels.map((item, index) => {
              return <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
            })}
        </Select>
      </Modal>
      

    </div>
  );
}

export default App2;

