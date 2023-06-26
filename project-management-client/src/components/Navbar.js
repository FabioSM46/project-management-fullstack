import { Link } from "react-router-dom";
 
export const Navbar=()=> {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
 
      <Link to="/projects">
        <button>Projects</button>
      </Link>
    </nav>
  );
}
