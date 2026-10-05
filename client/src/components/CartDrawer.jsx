import { useState } from "react";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import {
  useCart,
} from "../context/CartContext";

import DemoPayment from "./DemoPayment";

import "./CartDrawer.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";

function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  const [checkout, setCheckout] =
    useState(false);

  const deliveryFee =
    subtotal > 0 ? 40 : 0;

  const total =
    subtotal + deliveryFee;


  const closeDrawer = () => {
    setCheckout(false);
    setCartOpen(false);
  };


  const startCheckout = () => {
    if (cart.length === 0) return;

    setCheckout(true);
  };


  const paymentComplete = () => {
    clearCart();

    setCheckout(false);

    setCartOpen(false);
  };


  return (
    <>

      <div
        className={
          cartOpen
            ? "cart-overlay show"
            : "cart-overlay"
        }
        onClick={closeDrawer}
      />


      <aside
        className={
          cartOpen
            ? "cart-drawer open"
            : "cart-drawer"
        }
      >

        {checkout ? (

          <DemoPayment
            cart={cart}
            subtotal={subtotal}
            deliveryFee={
              deliveryFee
            }
            total={total}
            onBack={() =>
              setCheckout(false)
            }
            onSuccess={
              paymentComplete
            }
          />

        ) : (

          <>

            <div className="cart-header">

              <div>

                <span>
                  YOUR ORDER
                </span>

                <h2>
                  My Cart
                </h2>

              </div>

              <button
                className="close-cart"
                onClick={
                  closeDrawer
                }
              >
                <X />
              </button>

            </div>


            <div className="cart-body">

              {cart.length === 0 ? (

                <div className="empty-cart">

                  <span>
                    <ShoppingBag />
                  </span>

                  <h3>
                    Your cart is empty
                  </h3>

                  <p>
                    Add something
                    delicious from our
                    menu.
                  </p>

                  <button
                    onClick={
                      closeDrawer
                    }
                  >
                    Explore Menu
                  </button>

                </div>

              ) : (

                cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item._id}
                  >

                    <img
                      src={
                        item.image ||
                        fallbackImage
                      }
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget
                          .src =
                          fallbackImage;
                      }}
                    />

                    <div className="cart-item-info">

                      <div className="cart-item-top">

                        <div>

                          <h4>
                            {item.name}
                          </h4>

                          <span>
                            ₹{item.price}
                          </span>

                        </div>

                        <button
                          className="remove-cart-item"
                          onClick={() =>
                            removeFromCart(
                              item._id
                            )
                          }
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                      </div>


                      <div className="cart-item-bottom">

                        <div className="cart-counter">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item._id
                              )
                            }
                          >
                            <Minus
                              size={14}
                            />
                          </button>

                          <span>
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item._id
                              )
                            }
                          >
                            <Plus
                              size={14}
                            />
                          </button>

                        </div>

                        <strong>
                          ₹
                          {Number(
                            item.price
                          ) *
                            item.quantity}
                        </strong>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>


            {cart.length > 0 && (

              <div className="cart-summary">

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


                <div className="cart-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{total}
                  </strong>

                </div>


                <button
                  className="place-order-btn"
                  onClick={
                    startCheckout
                  }
                >

                  Proceed to Payment

                  <span>
                    ₹{total}
                  </span>

                </button>


                <small>
                  Demo checkout • No real
                  payment will be charged
                </small>

              </div>

            )}

          </>

        )}

      </aside>

    </>
  );
}

export default CartDrawer;