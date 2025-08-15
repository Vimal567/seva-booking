import { useMemo, useState } from "react";
import "./PaymentModal.css";

export default function PaymentModal({ open, amount, onClose, onSuccess }) {
  const [tab, setTab] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [upiId, setUpiId] = useState("");

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };

  const validateExpiry = (exp) => {
    const m = /^(\d{2})\/(\d{2}|\d{4})$/.exec(exp?.trim() || "");
    if (!m) return false;
    const month = +m[1];
    const year = m[2].length === 2 ? 2000 + +m[2] : +m[2];
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const expiry = new Date(year, month, 0, 23, 59, 59, 999);
    return expiry >= now;
  };

  const validateUPI = (upi) =>
    /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test((upi || "").trim());

  const cardValid = useMemo(() => {
    return isNumeric(cardNumber) && validateExpiry(expiry) && isNumeric(cvv);
  }, [cardNumber, expiry, cvv]);

  const upiValid = useMemo(() => validateUPI(upiId), [upiId]);
  const canPay = tab === "card" ? cardValid : upiValid;

  const handlePay = () => {
    onSuccess?.();
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="header">
          <h3>Complete Payment</h3>
          <button
            className="closeBtn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab ${tab === "card" ? "active" : ""}`}
            onClick={() => setTab("card")}
          >
            Card
          </button>
          <button
            className={`tab ${tab === "upi" ? "active" : ""}`}
            onClick={() => setTab("upi")}
          >
            UPI
          </button>
        </div>

        {tab === "card" ? (
          <div className="body">
            <label className="label">
              Card Number
              <input
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                minLength="16"
                maxLength="16"
                pattern="[0-9]{16}"
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </label>

            <div className="row">
              <label className="label">
                Expiry
                <input
                  className="input"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </label>

              <label className="label">
                CVV
                <input
                  className="input"
                  type="password"
                  placeholder="123"
                  minLength="3"
                  maxLength="4"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="body">
            <label className="label">
              UPI ID
              <input
                className="input"
                type="text"
                placeholder="name@bank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </label>
          </div>
        )}

        <div className="footer">
          <div className="amount">Amount: ₹{amount.toFixed(2)}</div>
          <button
            className={`payBtn ${!canPay ? "payBtnDisabled" : ""}`}
            disabled={!canPay}
            onClick={handlePay}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
