import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
export default function Employ() {
  return (
    <div className="Employee">
      <div>
        <h1
          className="header_text"
          style={{
            width: 584,
            height: 27,
            marginLeft: 20,
            fontWeight: 800,
            fontSize: 20,
            // lineHeight:21,
            color: "#434349",
          }}
        >
          Danh sách bình bầu nhân viên đã thực hiện
        </h1>

        <div
          style={{
            marginBottom: 40,
          }}
        >
          <Input
            style={{
              // position: "absolute",
              width: 200,
              height: 40,
              marginLeft: 20,
              // left: 26,
              // top: 73,
              background: "#F0F5FA",
              borderRadius: 3,
            }}
            placeholder="Họ và tên"
          />
          <Input
            style={{
              // position: "absolute",
              width: 200,
              height: 40,
              marginLeft: 30,
              // left: 256,
              // top: 73,

              background: "#F0F5FA",
              borderRadius: 3,
            }}
            placeholder="Chức vụ"
          />
          <Input
            style={{
              // position: "absolute",
              width: 200,
              height: 40,
              marginLeft: 35,
              // left: 486,
              // top: 73,
              background: "#F0F5FA",
              borderRadius: 3,
            }}
            placeholder="Phòng ban"
          />
          <Button
            style={{
              background: "#35794A",
              color: "#FFFFFF",
              width: 115,
              height: 40,
              marginLeft: 40,
              // left: 550,
              // top: 73,
              borderRadius: 4,
              //   position: "absolute",
              cursor: "pointer",
              border: "1px solid #35794A",
              boxSizing: "border-box",
            }}
            className="btn-search"
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
          <Button
            style={{
              background: "#35794A",
              color: "#FFFFFF",
              width: 158,
              height: 40,
              marginLeft: 80,
              // left: 966,
              // top: 73,
              borderRadius: 4,
              // position: "absolute",
              cursor: "pointer",
              border: "1px solid #3699FF",
              boxSizing: "border-box",
            }}
            className="btn-search"
          >
            <FormOutlined />
            Đánh giá nhanh
          </Button>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
}
