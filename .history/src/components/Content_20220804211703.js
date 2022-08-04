import { useContext } from "react";
import { AppContext } from "../AppContext";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";


function Content() {
    const context = useContext(AppContext);
    const [form] = Form.useForm();
    return (
        <>
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
        </>
    )
}

export default Content