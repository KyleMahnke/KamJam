// to do:
// delete from cart,
// increase quantity,
// decrease quantity,
// link to checkout component

import { response } from "msw";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./AuthProvider";

const Cart = () => {
  const { user, token, isLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const userId = user.id;
  const [productId, setProductId] = useState(null);
  const [cart, setCart] = useState([]);
  console.log(token);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const resp = await fetch(`/api/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      console.log(data);
      setCart(data);
    };
    fetchCart(userId);
  }, []);

  const handleDeleteFromCart = async (userId, productId) => {
    console.log("HERE IS THE PRODUCT ID:", productId);
    const response = await fetch(
      `
    /api/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      }
    );
    console.log("HERE IS RESPONSE:", response);
    const parsedResponse = await response.json();
    console.log(parsedResponse.id);
    if (parsedResponse.id) {
      const newCart = cart.filter((product) => product.productId !== productId);
      setCart(newCart);
      console.log(newCart);
    }
  };

  return (
    <>
      <h1>Here is your cart good sir</h1>
      {cart.map((myCart) => (
        <div className="mycart" key={myCart.productId}>
          <h3 className="cart-info">{myCart.name}</h3>
          <img className="cart-image" src={myCart.imageurl} />
          <p className="cart-info">$ {myCart.price}</p>
          <p cart-info>Quantity: {myCart.quantity}</p>
          <button
            onClick={() => handleDeleteFromCart(userId, myCart.productId)}
          >
            Remove from cart
          </button>
          <br />
          <br />
        </div>
      ))}
    </>
  );
};

export default Cart;
