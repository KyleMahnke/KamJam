import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import AddToCartButton from "./AddToCartButton";
import { ProductsContext } from "./ProductsProvider";
import NotFound from "./NotFound";

const ProductDetails = ({}) => {
  const [product, setProduct] = useState([]);

  const params = useParams();
  const { products } = useContext(ProductsContext);
  const productId = params.productId;

  useEffect(() => {
    const fetchProduct = async () => {
      const resp = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setProduct(data.product);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="single-product-container">
        {product.length > 0 ? (
          product.map((product) => (
            <div className="single-product-details-card" key={product.id}>
              {console.log("THIS IS PRODUCT:", product)}
              <h1 className="single-product-name">{product.name}</h1>
              <h2 className="single-product-description">
                {product.description}
              </h2>
              <img className="single-product-image" src={product.imageurl} />
              <div className="price-cart-box">
                <p className="single-product-stock">
                  No. in stock: {product.inventory}
                </p>
                <p className="single-price">$ {product.price}</p>
                <AddToCartButton />
              </div>
            </div>
          ))
        ) : (
          <NotFound
            title="No Product Found"
            description="This Product Does Not Exist"
          />
        )}
      </div>
    </>
  );
};

export default ProductDetails;
