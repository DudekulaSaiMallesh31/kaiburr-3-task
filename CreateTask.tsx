import { Form, Input, Button, message } from "antd";
import axios from "axios";

const CreateTask = () => {
  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:8080/tasks", values);
      message.success("Task created successfully");
    } catch (error) {
      message.error("Failed to create task");
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Task Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="command"
          label="Command"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTask;
