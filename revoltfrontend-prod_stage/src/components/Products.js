import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  console.log(product);
  return (
    <div key={product.product_id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">&#8377; {product.price}</div>
      </div>
    </div>
  );
}
