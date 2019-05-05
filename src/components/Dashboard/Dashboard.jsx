import React, { Component } from "react";
import "./Dashboard.css";
import Product from "./Product/Product";

class Dashboard extends Component {
  render() {
    const productComponents = this.props.inventory.map(product => {
      return (
        <Product
          key={product.id}
          {...product}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
        />
      );
    });
    return <div className="Dashboard">{productComponents}</div>;
  }
}

export default Dashboard;
