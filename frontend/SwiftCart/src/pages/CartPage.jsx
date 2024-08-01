import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/cart";

function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  // Add total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete item
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error(error);
    }
  };

  // Update item quantity
  const updateQuantity = (pid, quantity) => {
    const myCart = cart
      .map((item) =>
        item._id === pid
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) } // Ensuring quantity is always at least 1
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // Add item to cart with initial quantity of 1
  const addItemToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      updateQuantity(product._id, 1);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }]; // Start quantity from 1
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                className="row mb-2 card flex-row align-items-center shadow-sm p-3 mb-5 bg-white rounded"
                key={p._id}
              >
                <div className="col-md-4">
                  <img
                    src={`${
                      import.meta.env.VITE_BASE_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="col-md-8">
                  <div>
                    <p className="fw-bold">{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p className="fw-bold">Price: ${p.price}</p>
                    <div className="d-flex align-items-center my-2">
                      <button
                        className="btn btn-black text-white me-2"
                        onClick={() => updateQuantity(p._id, -1)}
                        disabled={p.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{p.quantity}</span>
                      <button
                        className="btn btn-black text-white"
                        onClick={() => updateQuantity(p._id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded shadow-sm">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              <button className="btn btn-black text-white w-100 mt-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
