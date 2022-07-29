//state
import { useStateContext } from "../lib/context";
//components
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import User from "./User";
//styles
import { NavItems, NavStyles } from "../styles/NavStyles";
//animation
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQuantities, setTotalQuantities } =
    useStateContext();
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>

      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence> {showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
