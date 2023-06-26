import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ProjectListPage } from "./pages/ProjectListPage";
import { Routes, Route } from "react-router-dom";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { EditProjectPage } from "./pages/EditProjectPage";
import { EditTaskPage } from "./pages/EditTaskPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/edit/:projectId" element={<EditProjectPage />} />
        <Route path="/tasks/edit/:taskId" element={<EditTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
