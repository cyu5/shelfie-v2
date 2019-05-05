import React, { Component } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = function(props) {
  const handleDelete = _ => {
    props.onDelete(props.id);
  };

  const handleEdit = _ => {
    props.onEdit(props.id);
  };

  return (
    <div className="Product">
      <img className="product_img" src={props.image} alt="" />
      <div className="product_box">
        <p>{props.name}</p>
        <p>{props.price}</p>
      </div>
      <div className="product_button_box">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>
          <Link to="/form">Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default Product;
