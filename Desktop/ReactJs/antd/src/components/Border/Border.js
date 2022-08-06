import React from "react";
import { Table, Checkbox } from "antd";
import "./Border.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Họ và tên ",
    dataIndex: "name",
    key: "name",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "Phòng ban",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "Chức vụ",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Tự đánh giá",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Cấp 100",
    dataIndex: "level100",
    key: "level100",
  },
  {
    title: "Cấp 200",
    dataIndex: "level200",
    key: "level200",
  },
  {
    title: "Cấp 300",
    dataIndex: "level300",
    key: "level300",
  },
  {
    title: "Bình quân gia quyền",
    dataIndex: "score",
    key: "score",
    // render: (text) => <Checkbox />,
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
          <button className="edit_border">
            <EditOutlined />
            Chỉnh sửa
          </button>
          <button className="delete_border">
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
    name: "Nguyễn Văn Tài",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: " 90",
    level100: " 90",
    level200: " 100",
    level300: " 100",
    score: " 100",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Nguyễn Văn A",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: " 90",
    level100: " 90",
    level200: " 100",
    level300: " 100",
    score: " 100",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Nguyễn Văn B",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: " 90",
    level100: " 90",
    level200: " 80",
    level300: " 100",
    score: " 100",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Nguyễn Văn C",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: " 90",
    level100: " 90",
    level200: " 100",
    level300: " 90",
    score: " 100",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Nguyễn Văn D",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: "100",
    level100: " 80",
    level200: " 90",
    level300: " 100",
    score: " 90",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Nguyễn Văn B",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: " 90",
    level100: " 100",
    level200: " 60",
    level300: " 100",
    score: " 100",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Nguyễn Văn B",
    room: "Phòng CNTT",
    level: "Nhân viên",
    number: "100",
    level100: " 90",
    level200: " 100",
    level300: " 100",
    score: " 100",
    address: "Sidney No. 1 Lake Park",
  },
];

const TableComponent = () => {
  return <Table className="border-text" columns={columns} dataSource={data} />;
};
<p>Hiển thị 10 trong 600</p>;

export default TableComponent;
