//state
import { useStateContext } from "../lib/context";
//compenents
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
//styles
import {
  CartWrapper,
  Card,
  CartStyle,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import getStripe from "../lib/getStripe";
//motion
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();
  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: "0.2" }}
          >
            <h1>You have more shopping to do😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 && (
            <Checkout layout>
              <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
              <button onClick={handleCheckout}>Purchase</button>
            </Checkout>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <Card layout key={item.slug} variants={card}>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>${item.price}</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={() => onRemove(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => onAdd(item, 1)}>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            ))}
        </Cards>
      </CartStyle>
    </CartWrapper>
  );
}
