import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
//components
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
//state
import { useStateContext } from "../../lib/context";
//styles
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
//motion
const { motion } = require("framer-motion");

export default function ProductDetails() {
  //state
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();

  //fetch slug
  const { query } = useRouter();
  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;

  //check for the data coming in
  if (fetching) return <p> loading...</p>;
  if (error) return <p>Oh no.. {error.message}</p>;

  //extract data

  const { title, description, image } = data.products.data[0].attributes;
  // console.log(title, description, image);

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.large.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <motion.span>Quantity</motion.span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>
          add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
