import React from "react";
import { Table, Checkbox } from "antd";
import "./Table.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

  //   {
  //     title: "Chấm kết thúc",
  //     dataIndex: "address",
  //     key: "address",
  //     render: (text) => <Checkbox />,
  //   },
  {
    title: "Thao tác",
    key: "action",
    render: (record) => {
      return (
        <>
          <button className="edit_table">
            <EditOutlined />
            Chỉnh sửa
          </button>
          <button className="delete_table">
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

const TableComponent = () => {
  return <Table className="border-text" columns={columns} dataSource={data} />;
};
<p>Hiển thị 10 trong 600</p>;

export default TableComponent;
