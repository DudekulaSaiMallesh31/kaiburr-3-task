import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><a href="/">Task List</a></Menu.Item>
            <Menu.Item key="2"><a href="/create">Create Task</a></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create" element={<CreateTask />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
