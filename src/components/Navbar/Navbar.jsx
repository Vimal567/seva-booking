import { Fragment, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const orders = useSelector((state) => state.orders.list);

  const latestOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 3);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
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
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>{user.contact}</li>
        </ul>
        {latestOrders.length ? <Fragment>
            <hr />
            <ul>
              <li>Latest 3 orders</li>
              {latestOrders.slice(0, 3).map((order, index) => (
                <li key={index}>Order #{order.orderId}</li>
              ))}
            </ul>
          </Fragment> : null
        }
      </div>
    </div>
  );
};

export default Navbar;
