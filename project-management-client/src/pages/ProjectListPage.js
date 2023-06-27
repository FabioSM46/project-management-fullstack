import { useState, useEffect } from "react";
import axios from "axios";
import { AddProject } from "../components/AddProject";
import { ProjectCard } from "../components/ProjectCard";
import projectsService from "../services/projects.service";
const API_URL = "http://localhost:5005";

export const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    projectsService
      .getAllProjects()
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      <AddProject refreshProjects={getAllProjects} />
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
};
