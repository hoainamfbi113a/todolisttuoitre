import React, {useState, useRef, useContext, useEffect} from "react";
import { Table, Checkbox,Form, Input, InputNumber, Popconfirm,  Typography } from "antd";
import "./Table.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EditableContext = React.createContext(null);
const EditableRow =({index, ...props}) => {
  const [form] = Form.useForm();
  return(
    <Form form={form} component={false}>
    <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell=({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing ] =useState(false) ;
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() =>{
    if(editing){
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try{
      const values = await form.validateFields();
      toggleEdit();
      handleSave({...record, ...values});
    }catch (errInfo){
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if(editable){
    childNode=editing ? (
      <Form.Item
      style={{
        margin: 0,
      }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title} is required.`,
        },
      ]}
    >
      <Input ref={inputRef} onPressEnter={save} onBlur={save} />
    </Form.Item>
    ) : (
      <div
      className="editable-cell-value-wrap"
      style={{
        paddingRight: 24,
      }}
      onClick={toggleEdit}
    >
      {children}
    </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const columns = [
  {
    title: "Tên nhóm ",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "Người chấm",
    dataIndex: "who",
    key: "who",
  },
  {
    title: "Cấp chấm",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Hệ số",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Chấm tham khảo",
    dataIndex: "check",
    key: "check",
    render: (text) => <Checkbox />,
  },
  {
    title: "Chấm kết thúc",
    dataIndex: "finish check",
    key: "finish check",
    render: (text) => <Checkbox />,
  },
  {
    title: "Thao tác",
    key: "action",
    render: (_, record) => {
      return (
        <>
          <button className="edit_table">
            <EditOutlined />
            Chỉnh sửa
          </button>
          <button title="Sure to delete" onConfirm className="delete_table" >
            <DeleteOutlined /> Xóa
          </button>
        </>
      );
    },
  },
];

const data = [
  {
    key: "1",
    name: "Nhóm A",
    who: "Nguyễn Văn A",
    level: "100",
    number: "2",

    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Nhóm B",
    who: "Nguyễn Văn B",
    level: "100",
    number: "3",

    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Nhóm C",
    who: "Nguyễn Văn C",
    level: "90",
    number: "4",

    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Nhóm D",
    who: "Nguyễn Văn D",
    level: "100",
    number: "5",

    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Nhóm E",
    who: "Nguyễn Văn E",
    level: "100",
    number: "",

    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Nhóm F",
    who: "Nguyễn Văn F",
    level: "100",
    number: "6",

    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Nhóm G",
    who: "Nguyễn Văn G",
    level: "100",
    number: "",

    address: "Sidney No. 1 Lake Park",
  },
];
for (let i=0; i<100; i++) {
  data.push({
    key: i.toString(),
    name:`Nhóm ${i}`,
    who: "Nguyễn Văn A",
    level: "100",
    number: "2",
  })
};
  
  
const TableComponent = () => {
  const [dataSource, setDataSource] = useState(data);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = useState(columns);
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Nhóm ${count}`,
      who: `Nguyễn Văn ${count}`,
      level: "100",
    number: "2",     
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return (

  <Table className="border-text" columns={columns} dataSource={data} />
  )
};
export default TableComponent;
