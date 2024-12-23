import React from "react";
import { Link } from "react-router-dom";
// import Rating from './Rating';

export default function Product(props) {
  const { key, product } = props;
  console.log(key);

  return (
    <div id={product._id} key={product.k} className="card">
      <Link to={`/product/${product.model_id}`}>
        <img
          className="medium"
          src={`/images/${product.image}`}
          alt={product.model_family_name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.model_id}`}>
          <h2>{product.model_family_name}</h2>
        </Link>
        <div className="row">
          <div>
            <h2>Color:{product.color}</h2>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
