import React from "react";
import { Button, Input } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
export default function Employee() {
  return (
    <div className="EmpScore">
      <div>
        <h1
          className="heading"
          style={{
            width: 468,
            height: 27,
            marginLeft: 20,
            fontWeight: 800,
            fontSize: 24,
            color: "#434349",
          }}
        >
          Danh sách quy trình chấm điểm
        </h1>
        <div style={{ marginTop: 30 }}>
          <Button
            className="btn"
            style={{
              width: 140,
              height: 40,
              float: "right",
              background: "#35794A",
              borderRadius: 4,
              color: "#FFFFFF",
            }}
          >
            <PlusOutlined />
            Tạo quy trình
          </Button>
          <Input
            placeholder="Nhóm A"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
            }}
          />
          <Input
            placeholder="Người chấm"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 15,
            }}
          />
          <Input
            placeholder="Cấp chấm"
            style={{
              width: 215,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 15,
            }}
          />
          <Input
            placeholder="Hệ số"
            style={{
              width: 153,
              height: 44,
              background: "#F0F5FA",
              borderRadius: 3,
              marginLeft: 15,
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
