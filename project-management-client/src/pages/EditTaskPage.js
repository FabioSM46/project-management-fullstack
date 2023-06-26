import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

export const EditTaskPage = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/tasks/${taskId}`)
      .then((response) => {
        const oneTask = response.data;
        setTitle(oneTask.title);
        setDescription(oneTask.description);
      })
      .catch((error) => console.log(error));
  }, [taskId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };

    // Make a PUT request to update the task
    axios
      .put(`${API_URL}/api/tasks/${taskId}`, requestBody)
      .then((response) => {
        navigate(-1);
      });
  };

  return (
    <div className="EditTaskPage">
      <h3>Edit the Task</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};
