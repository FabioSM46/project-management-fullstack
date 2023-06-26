import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ProjectListPage } from "./pages/ProjectListPage";
import { Routes, Route } from "react-router-dom";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
