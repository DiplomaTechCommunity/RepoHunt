import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; 
import './navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState("#0B0E1A"); // Default background color

  useEffect(() => {
    // Updating the background color based on the current route
    if (location.pathname === "/") {
      setBackgroundColor("#241E44");
    } else if (location.pathname === "/repos") {
      setBackgroundColor("#0B0E1A");
    }
  }, [location.pathname]); // Triggers the effect when the pathname changes

  return (
    <div className="navbar" style={{ backgroundColor: backgroundColor }}>
      <Link to="/">
        <div id="logo">
          <img src={logo} alt="github" id="logo" />
          <p id="main-text">Repo hunt</p>
        </div>
      </Link>

      <div className="navigation mx-10">
        <Link to="/" className="mx-2 text-white">Home</Link>
        <Link to="/repos" className="mx-5 text-white">Search</Link>
      </div>
    </div>
  );
}

export default Navbar;
