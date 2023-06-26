import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5005";

export const TaskCard = ({ title, description, _id }) => {
  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}/api/tasks/${id}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="TaskCard card">
      <h3>{title}</h3>
      <h4>Description:</h4>
      <p>{description}</p>

      <button
        onClick={(e) => {
          e.preventDefault();
          deleteTask(_id);
        }}
      >
        Delete Task
      </button>
      <Link to={`/tasks/edit/${_id}`}>
        <button>Edit Task</button>
      </Link>
    </div>
  );
};
