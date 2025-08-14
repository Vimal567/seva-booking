import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  useEffect(() => {}, []);

  return (
    <div className="navbar-container">
      <h1>Navbar</h1>

      <ul className="menu">
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/cart">Cart</Link>
        </li>
        <li className="menu-item" onClick={toggleSidebar}>
          User
        </li>
      </ul>

      <div className={`sidebar ${isSidebarVisible ? "show" : ""}`}>
        <ul>
          <li>Vimal</li>
          <li>Vimalrock82@gmail.com</li>
          <li>9443770773</li>
        </ul>
        <hr />
        <ul>
          <li>Latest 3 orders</li>
          <li>order # 12345</li>
          <li>order # 12345</li>
          <li>order # 12345</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
