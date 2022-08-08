import React from "react";
import { Button, Input, Select, Option } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
export default function Employ() {
  const { Option } = Select;
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
         <Select
            style={{
              width: 120,
              // height: 40,
              marginLeft: 35,
              background: "#F0F5FA",
              borderRadius: 3,
            }}
            placeholder="Chức vụ"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) => {
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase());
            }}
            >
            <Option value='1'>Tổng biên tập</Option>
            <Option value='2'>Phó tổng biên tập</Option>
            <Option value='3'>Trưởng phòng</Option>
            <Option value='4'>Phó trưởng phòng</Option>
            <Option value='5'>Phóng viên</Option>
            <Option value='6'>Biên tập viên</Option>
            <Option value='7'>Developer</Option>
            <Option value='8'>IT Helpdesk</Option>
            <Option value='9'>Tỉnh táo viên</Option>
            <Option value='10'>Họa sĩ</Option>
            <Option value='11'>Bảo vệ</Option>
            <Option value='12'>Marketing</Option>
            <Option value='13'>Lễ tân</Option>
            <Option value='14'>Moraser</Option>
            </Select>
          <Select
            style={{
              width: 150,
              // height: 40,
              marginLeft: 35,
              background: "#F0F5FA",
              borderRadius: 3,
              
            }}
            placeholder="Phòng ban"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) => {
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase());
            }}
            >
            <Option value='1'>Phòng CNTT</Option>
            <Option value='2'>Phòng Biên tập viên</Option>
            <Option value='3'>Phòng Quảng cáo</Option>
            <Option value='4'>Phòng Tỉnh táo viên</Option>
            <Option value='5'>Phòng Hậu cần</Option>
            <Option value='6'>Phòng Căn tin</Option>
            <Option value='7'>Phòng Công tác bạn đọc</Option>
            <Option value='8'>Phòng Công tác xã hội</Option>
            <Option value='9'>Phòng Giáo dục khoa học</Option>
            <Option value='10'>Phòng Họa sĩ</Option>
            <Option value='11'>Phòng Kho vận</Option>
            <Option value='12'>Phòng Kinh tế</Option>
            <Option value='13'>Phòng Morase</Option>
            <Option value='14'>Nhà in</Option>
            </Select>
          <Button
            style={{
              background: "#35794A",
              color: "#FFFFFF",
              width: 115,
              height: 40,
              marginLeft: 40,
              borderRadius: 4,
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
    </div>
  );
}
