import { useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User form state
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userVerified, setUserVerified] = useState(false);

  // Address form state
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [addrType, setAddrType] = useState("");
  const [addressVerified, setAddressVerified] = useState(false);

  const [showPayment, setShowPayment] = useState(false); // <-- ADD

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  // Simulate OTP send
  const handleSendOtp = () => {
    //We have to check if identity exist but here no backend
    if (/^[6-9]\d{9}$/.test(mobile)) {
      setOtpSent(true);
      alert("OTP sent (mock: 1234)");
    } else {
      alert("Invalid mobile number");
    }
  };

  // Simulate OTP verify
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setUserVerified(true);
      alert("User verified!");
    } else {
      alert("Invalid OTP");
      setOtpSent(false);
    }
  };

  // Simulate pincode lookup
  const handlePincodeLookup = () => {
    setCity("Hyderabad");
    setStateName("Telangana");
    setAddressVerified(true);
  };

  const canPay = userVerified && addressVerified;

  const handlePaymentSuccess = () => {
    alert("Payment Successful!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <section className="cart-section">
      <h1>Checkout Page</h1>

      {cartItems?.length ? (
        <div className="checkout-grid">
          {/* LEFT: Cart Items */}
          <div className="container">
            {cartItems.map((seva) => (
              <div key={seva.id} className="seva-item">
                <img src={seva.media} alt={seva.title} />
                <div className="seva-details">
                  <strong>{seva.title}</strong>
                  <span>₹{seva.discountedPrice * seva.quantity}</span>

                  <div className="seva-items-quantity-update">
                    <button
                      disabled={seva.quantity === 1}
                      onClick={() => dispatch(decreaseQuantity(seva.id))}
                    >
                      -
                    </button>
                    {seva.quantity}
                    <button onClick={() => dispatch(increaseQuantity(seva.id))}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => dispatch(removeFromCart(seva.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h3>Total: ₹{totalAmount}</h3>
          </div>

          {/* RIGHT: User & Address */}
          <div className="container">
            {/* USER DETAILS */}
            {!userVerified ? (
              <form>
                <h2 className="heading">User Details</h2>

                <label className="label">
                  Number
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobile}
                    id="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </label>

                {!otpSent && (
                  <button
                    type="button"
                    className="submit-buttons"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                )}
                <br />
                <br />
                {otpSent && (
                  <>
                    <label className="label">
                      OTP
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        id="otpVerify"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </label>
                    <br />
                    <button
                      type="button"
                      className="submit-buttons"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </form>
            ) : (
              <p>User verified, existing user</p>
            )}

            {/* ADDRESS SECTION */}
            <h2 className="heading">Address</h2>

            <label className="label">
              Pincode
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                id="pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
            </label>

            <button
              className="submit-buttons"
              onClick={handlePincodeLookup}
            >
              Lookup
            </button>
            <br />
            <br />

            {city && stateName && (
              <>
                <label className="label">
                  City
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    id="city"
                    readOnly
                  />
                </label>

                <label className="label">
                  State
                  <input
                    type="text"
                    placeholder="State"
                    value={stateName}
                    id="stateName"
                    readOnly
                  />
                </label>

                <label className="label">
                  Address Type
                  <select
                    value={addrType}
                    id="addrType"
                    onChange={(e) => setAddrType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="label">
                  Address Line 1
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    value={addr1}
                    id="addr1"
                    onChange={(e) => setAddr1(e.target.value)}
                  />
                </label>

                <label className="label">
                  Address Line 2
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    value={addr2}
                    id="addr2"
                    onChange={(e) => setAddr2(e.target.value)}
                  />
                </label>
              </>
            )}

            {/* PAY NOW */}
            <button
              className={`${canPay ? "pay-now" : "cannot-pay"} `}
              type="button"
              disabled={!canPay}
              onClick={() => setShowPayment(true)}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        // In case of empty cart
        <div className="no-items">No items in the cart</div>
      )}

      {/* PAYMENT MODAL */}
      <PaymentModal
        open={showPayment}
        amount={totalAmount}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    </section>
  );
};

export default Cart;
