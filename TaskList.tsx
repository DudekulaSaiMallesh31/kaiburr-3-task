import { useState, useEffect } from "react";
import { Table, Button, message, Space, Input } from "antd";
import axios from "axios";

interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: { startTime: string; endTime: string; output: string }[];
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/tasks");
      setTasks(res.data);
    } catch (error) {
      message.error("Failed to load tasks");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      message.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const handleExecute = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/tasks/${id}/execute`);
      message.success("Task executed successfully");
      fetchTasks();
    } catch (error) {
      message.error("Execution failed");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Command", dataIndex: "command", key: "command" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <Space>
          <Button type="primary" onClick={() => handleExecute(record.id)}>
            Run
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Task List</h2>
      <Input.Search
        placeholder="Search tasks"
        style={{ marginBottom: 16, width: 300 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table
        dataSource={filteredTasks}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default TaskList;
