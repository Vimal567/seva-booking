import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./pages/Landing/Landing";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadSevas } from './store/sevaSlice';
import { loadUser } from './store/userSlice';
import { loadOrders } from './store/orderSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSevas());
    dispatch(loadUser(101)); // default user
    dispatch(loadOrders(101));
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
