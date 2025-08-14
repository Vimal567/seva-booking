import { useEffect, useState } from "react";
import "./Landing.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cartSlice";

const Landing = () => {
  const sevas = useSelector((state) => state.sevas.list);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [paginatedSevas, setPaginatedSevas] = useState([]);

  useEffect(() => {
    const updatedSevas = sevas.slice(0, limit);
    setPaginatedSevas(updatedSevas);
  }, [sevas, limit]);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <section className="landing-page-section">
      <h1>Landing Page</h1>

      {/* Seva list */}
      <div className="grid-container">
        {paginatedSevas.map((seva) => (
          <div key={seva.id} className="seva-card">
            <img src={seva.media} alt={seva.title} />
            <h3>{seva.title}</h3>
            <p>₹{seva.discountedPrice}</p>

            {!isInCart(seva.id) ? (
              <button type="button" onClick={() => dispatch(addToCart(seva))}>
                Add to Cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(seva.id))}
              >
                Remove from Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {paginatedSevas.length < sevas.length && (
        <button onClick={() => setLimit((prev) => prev + 10)}>More</button>
      )}
    </section>
  );
};

export default Landing;
