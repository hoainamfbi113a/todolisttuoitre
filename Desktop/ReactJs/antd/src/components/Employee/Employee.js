import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import Employ from "../Employ/Employ";
import Create from "./../Create/Create";
export default function Employee() {
  const [isModal, setIsModal] = useState(false);
  const showModal = () => {
    setIsModal(true);
  };
  const handleOk = () => {
    setIsModal(false);
  };
  const handleCancel = () => {
    setIsModal(false);
  };
  return (
    <div className="EmpScore">
      <div>
        <div
          style={{
            alignContent: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1
            className="heading"
            style={{
              width: 468,
              height: 27,
              marginLeft: 20,
              fontWeight: 800,
              fontSize: 24,
              color: "#434349",
              marginTop:30
            }}
          >
            Danh sách quy trình chấm điểm
          </h1>
          <Button
            className="btn"
            onClick={showModal}
            style={{
              width: 168,
              height: 40,
              background: "#35794A",
              borderRadius: 4,
              color: "#FFFFFF",
              marginTop:30,
              marginRight:33
            }}
          >
            <PlusOutlined />
            Tạo quy trình
          </Button>
        </div>
        <div style={{
           marginTop: 30,
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center", 
           }}>
          <Modal
            title="Modal"
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Create />
          </Modal>
          {/* <hr style={{
            // width: 1152,
          }} /> */}
          <Input
            placeholder="Nhóm A"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 20,
            }}
          />
          <Input
            placeholder="Người chấm"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              // marginLeft: 15,
              // marginTop: 40,
            }}
          />
          <Input
            placeholder="Cấp chấm"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 10,
            }}
          />
          <Input
            placeholder="Hệ số"
            style={{
              width: 153,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 10,
            }}
          />
          <Button
            style={{
              width: 151,
              height: 44,
              float: "right",
              background: "#3699FF",
              border: "1px solid #3699FF",
              borderRadius: 3,
              marginRight:36,

              color: "#FFFFFF",
            }}
          >
            <FileSearchOutlined />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
}
