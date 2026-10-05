import { useState } from "react";

import {
  ArrowLeft,
  Banknote,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  Smartphone,
  Sparkles,
} from "lucide-react";

import "./DemoPayment.css";

function DemoPayment({
  cart,
  subtotal,
  deliveryFee,
  total,
  onBack,
  onSuccess,
}) {
  const [method, setMethod] =
    useState("upi");

  const [processing, setProcessing] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [upiId, setUpiId] =
    useState("demo@upi");

  const orderNumber =
    `FR${Math.floor(
      1000 + Math.random() * 9000
    )}`;

  const simulatePayment = () => {
    if (processing) return;

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1500);
  };

  const finishPayment = () => {
    onSuccess();
  };

  if (success) {
    return (
      <div className="payment-success">

        <div className="payment-success-icon">
          <CheckCircle2 />
        </div>

        <span className="success-label">
          DEMO PAYMENT SUCCESSFUL
        </span>

        <h2>
          Payment successful!
        </h2>

        <p>
          Your demo order has been
          confirmed. No real money was
          charged.
        </p>

        <div className="success-amount">
          <small>
            AMOUNT PAID
          </small>

          <strong>
            ₹{total}
          </strong>
        </div>

        <div className="success-order-info">

          <div>
            <span>
              Order Number
            </span>

            <strong>
              {orderNumber}
            </strong>
          </div>

          <div>
            <span>
              Payment
            </span>

            <strong>
              Demo
            </strong>
          </div>

          <div>
            <span>
              Status
            </span>

            <strong className="success-status">
              <Check size={14} />
              Confirmed
            </strong>
          </div>

        </div>

        <div className="demo-success-note">
          This was a simulated payment
          created for demonstration
          purposes.
        </div>

        <button
          className="continue-order-btn"
          onClick={finishPayment}
        >
          Continue Exploring
        </button>

      </div>
    );
  }

  return (
    <div className="demo-payment">

      <div className="payment-header">

        <button
          className="payment-back"
          onClick={onBack}
          disabled={processing}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <span>
            CHECKOUT
          </span>

          <h2>
            Complete Payment
          </h2>
        </div>

        <div className="demo-mode-badge">
          <LockKeyhole size={13} />
          DEMO
        </div>

      </div>


      <div className="demo-warning">

        <span>
          <Sparkles size={17} />
        </span>

        <div>
          <strong>
            Demo Payment Mode
          </strong>

          <p>
            No real transaction will
            occur and no money will be
            charged.
          </p>
        </div>

      </div>


      <section className="payment-order-summary">

        <div className="payment-section-title">
          <span>
            ORDER SUMMARY
          </span>

          <small>
            {cart.reduce(
              (totalItems, item) =>
                totalItems +
                item.quantity,
              0
            )}{" "}
            items
          </small>
        </div>

        <div className="payment-items">

          {cart.map((item) => (

            <div
              className="payment-item"
              key={item._id}
            >

              <div>
                <strong>
                  {item.name}
                </strong>

                <small>
                  ₹{item.price}
                  {" × "}
                  {item.quantity}
                </small>
              </div>

              <strong>
                ₹
                {Number(item.price) *
                  item.quantity}
              </strong>

            </div>

          ))}

        </div>


        <div className="payment-calculation">

          <div>
            <span>
              Subtotal
            </span>

            <strong>
              ₹{subtotal}
            </strong>
          </div>

          <div>
            <span>
              Delivery fee
            </span>

            <strong>
              ₹{deliveryFee}
            </strong>
          </div>

          <div className="payment-total">
            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>
          </div>

        </div>

      </section>


      <section className="payment-method-section">

        <div className="payment-section-title">
          <span>
            PAYMENT METHOD
          </span>
        </div>


        <div className="payment-methods">

          <button
            type="button"
            className={
              method === "upi"
                ? "payment-method active"
                : "payment-method"
            }
            onClick={() =>
              setMethod("upi")
            }
          >

            <span className="method-icon">
              <Smartphone size={20} />
            </span>

            <div>
              <strong>
                Demo UPI
              </strong>

              <small>
                Simulate a UPI payment
              </small>
            </div>

            <i>
              {method === "upi" && (
                <Check size={13} />
              )}
            </i>

          </button>


          <button
            type="button"
            className={
              method === "card"
                ? "payment-method active"
                : "payment-method"
            }
            onClick={() =>
              setMethod("card")
            }
          >

            <span className="method-icon">
              <CreditCard size={20} />
            </span>

            <div>
              <strong>
                Demo Card
              </strong>

              <small>
                Simulate card payment
              </small>
            </div>

            <i>
              {method === "card" && (
                <Check size={13} />
              )}
            </i>

          </button>


          <button
            type="button"
            className={
              method === "cash"
                ? "payment-method active"
                : "payment-method"
            }
            onClick={() =>
              setMethod("cash")
            }
          >

            <span className="method-icon">
              <Banknote size={20} />
            </span>

            <div>
              <strong>
                Demo Cash
              </strong>

              <small>
                Simulate cash on delivery
              </small>
            </div>

            <i>
              {method === "cash" && (
                <Check size={13} />
              )}
            </i>

          </button>

        </div>


        {method === "upi" && (

          <div className="payment-demo-form">

            <label>
              Demo UPI ID

              <input
                value={upiId}
                onChange={(e) =>
                  setUpiId(
                    e.target.value
                  )
                }
                placeholder="demo@upi"
              />
            </label>

            <small>
              Use any fake demo ID.
              Nothing will be sent to a
              payment provider.
            </small>

          </div>

        )}


        {method === "card" && (

          <div className="payment-demo-card">

            <div className="fake-card">

              <div className="fake-card-top">
                <span>
                  FOODRUSH
                </span>

                <CreditCard />
              </div>

              <div className="fake-card-number">
                •••• •••• •••• 2026
              </div>

              <div className="fake-card-bottom">

                <div>
                  <small>
                    DEMO CARD
                  </small>

                  <strong>
                    FOOD LOVER
                  </strong>
                </div>

                <div>
                  <small>
                    VALID
                  </small>

                  <strong>
                    12/30
                  </strong>
                </div>

              </div>

            </div>

            <p>
              This is a visual demo card.
              No real card number, CVV or
              banking information is
              required.
            </p>

          </div>

        )}


        {method === "cash" && (

          <div className="cash-demo-box">

            <Banknote />

            <div>
              <strong>
                Demo Cash on Delivery
              </strong>

              <p>
                Click the button below to
                simulate confirmation of a
                cash-on-delivery order.
              </p>
            </div>

          </div>

        )}

      </section>


      <div className="payment-bottom">

        <button
          className={
            processing
              ? "demo-pay-btn processing"
              : "demo-pay-btn"
          }
          onClick={simulatePayment}
          disabled={processing}
        >

          {processing ? (
            <>
              <span className="payment-spinner" />
              Processing Demo Payment...
            </>
          ) : (
            <>
              {method === "cash"
                ? "Confirm Demo Order"
                : `Pay ₹${total} — Demo`}
            </>
          )}

        </button>

        <p>
          <LockKeyhole size={12} />
          Simulation only • No actual
          payment will occur
        </p>

      </div>

    </div>
  );
}

export default DemoPayment;