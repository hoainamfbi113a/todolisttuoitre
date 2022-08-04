import './App.css';
import {Button, Form, Input, Table, Modal, message, Progress, Select, Spin } from 'antd'
import { useState, useRef, useEffect} from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons'

function App() {

  const levels = ['Easy', 'Medium', 'Hard']
  const todoAPI = 'https://62e399ac3c89b95396cbd5c2.mockapi.io/dawnny/todo'

  // các task
  const [tasks, setTasks] = useState([])
  const haveCompletedTasks = tasks.some(task => task.completed)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const inputRef = useRef()
  const [form] = Form.useForm();
  const [taskIndex, setTaskIndex] = useState(0)
  // task đang được type để add
  const [taskInput, setTaskInput] = useState('')
  // mức độ khó dễ của task, mỗi khi chọn 1 option khác trong dropdown menu thì set state lại
  const [level, setLevel] = useState('Easy')
  // có đang edit hay không (mở tắt modal)
  const [isEditing, setIsEditing] = useState(false)
  // task đang được edit
  const [editingTask, setEditingTask] = useState()
  const [editingTaskLevel, setEditingTaskLevel] = useState()
  // nếu được bấm nút search
  const [isSearching, setIsSearching] = useState(false)
  const [searchTasks, setSearchTasks] = useState([])
  // 

  useEffect(()=> {
    getTodo()
  },[])
  
  function getTodo() {
    setIsLoading(true)
    fetch(todoAPI)
    .then(response => response.json())
    .then(tasks => {
        setIsLoading(false)
        setTasks(tasks)
      })
  }

  function addTodo(todo) {
    var options =  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }
    fetch(todoAPI,options)
      .then(response => getTodo())
      // .then(function(response){
      //     response.json()
      // })
      // .then(callback)
  }

  function deleteTodo(id) {
    var options =  {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    }
    fetch(todoAPI + "/" + id,options)
      // .then(function(response){
      //     response.json()
      // })
      // .then(function(){
      //     var deleteItem = document.querySelector(`.course-item-${id}`)
      //     if (deleteItem){
      //         deleteItem.remove()
      //     }
      // })   
  }

  function updateTodo(todo, changeComplete = false, toggleAll='checkAll') {
    setIsUpdating(true)
    message.loading({
      content: 'Updating...',
      key: 'updating'
    }) 

    const updateTask = todo
    if (updateTask) {
      if (changeComplete) {
        updateTask.completed = !todo.completed
      }
      var options =  {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      }
      fetch(todoAPI + "/" + todo.id,options)
        .then(response => response.json())
        .then(response => {
          getTodo()
          setIsUpdating(false)
          message.success({
            content: 'Updated',
            key: 'updating',
            duration: 2
          })
        })
    }
    else {
      let promise = new Promise((resolve, reject) => {
        tasks.forEach(task => {
            task.completed = toggleAll === 'alreadyCheckedAll' ? false : true
            var options =  {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(task)
            }
            fetch(todoAPI + "/" + task.id,options)
              // .then(() => {
              //   console.log(task.id);
              //   console.log('index1',tasks.indexOf(task),'index2', tasks.length -1);
              //   if (tasks.indexOf(task) === tasks.length-1) {
              //     resolve()
              //     console.log('resolve', task.id);
              //   }
              // })
              // .then(response => response.json())
              // .then(response => resolve())
              // .then(() => new Promise(resolve => resolve()))
          })
        }) 

      
      // var result = Promise.all(actions)
      promise.then(resolve => {
        console.log('done');
        // getTodo()
        setIsUpdating(false)
        message.success({
          content: 'Updated',
          key: 'updating',
          duration: 2
        })

      })
      
    }
  }
  


  // custom config cho table
  let locale = {
    emptyText: isLoading ? <Spin size='large'></Spin>: 'NO TASK LEFT :)',
  }

  const columns = [
    {
      key: '1',
      title: 'Status',
      render: (item) => {
        return <div style={{textAlign: 'center'}}>
          <input 
            type="checkbox"
            onChange={() => handleSelect(item)} 
            checked={item.completed}
          />
        </div>
      },
      filters: [
        {text: 'Completed', value: true},
        {text: 'Uncomplete', value: false},
      ],
      onFilter: (value, item) => {
        return item.completed === value
      }
    },
    {
      key: '2',
      width: 500,
      title: 'Task',
      render: (item) => {
        if (item.completed) {
          return <h4 className="task-content done-task">{item.task}</h4>
        }
        else {
          return <h4 className='task-content'>{item.task}</h4>
        }
      },
      sorter: (record1, record2) => {
        return record1.task.localeCompare(record2.task)
      }
    },
    {
      key: '3',
      title: 'Level',
      width: 100,
      render: (item) => {
        if (item.level === 1) {
          return <span>Easy</span> 
        }
        else if (item.level === 2) {
          return <span>Medium</span> 
        } 
        else {
          return <span>Hard</span> 
        }
        
      },
      sorter: (record1, record2) => {
        return record1.level - record2.level 
      }
    },
    {
      key: '4',
      title: 'Actions',
      render: (item) => {
        return <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <EditOutlined
            onClick={() => handleEdit(item)}
          />
          <DeleteOutlined 
            onClick={() => handleDelete(item)}
            style={{color: 'red'}}
          />
        </div>
      }
    },
  ]

  // console.log('tasks', tasks);
  // console.log('search tasks', searchTasks);
  // console.log('index', taskIndex);


  const handleAdd = () => {
    if (taskInput) {
      const newTask = {
        // id: taskIndex,
        task: taskInput,
        level: level === 'Easy' ? 1 : level === 'Medium' ? 2 : 3,
        completed: false
      }
      addTodo(newTask)
      setTasks(prevState => {
        return [...prevState, newTask]
      })
      setTaskInput('')
      inputRef.current.focus()
    }
    else {
      message.error({
        content:'Please type in your task',
        className: 'message'
      })
    }
    setTaskIndex(prevState => prevState +1)
    form.resetFields();  
  }
  
  const handleDelete= (item) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        deleteTodo(item.id)
        setTasks(prevState => {
          return prevState.filter(task => task.id !== item.id)
        })
        if (isSearching) {
          setSearchTasks(prevState => {
            return prevState.filter(task => task.id !== item.id)
          })
        }
      },
    })
  }

  const handleEdit = (item) => {
    setIsEditing(true)
    setEditingTask({...item})
    setEditingTaskLevel(item.level)
  }

  const handleChangeLevel = (item) => {
    if (item !== level) {
      setLevel(item)
    }
  }


  const handleSelect = (item) => {
    updateTodo(item, true)
    setTasks(prevState => {
      return prevState.filter(task => {
        if (task.id === item.id){
          task.completed = !item.completed
        }
        return true
      })
    })
    
  }

  
  return (
    <div className="App">
      <div className="wrapper">
        <header>

          <h1 style={{color: 'white', margin: '0'}}>TO-DO LIST</h1>
        </header>

        <main>
          <div className="add-section">
            <Form className='form' form={form}>
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

export default App;

