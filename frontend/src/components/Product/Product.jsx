import React, { Component } from "react";
import "../../Styles/Product/Product.css";

// ({ SKU, name, price, attr, value, type, id }) =>
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleCheckBox(e) {
    const { value, checked } = e.target;
    this.props.checkBox(value, checked);
  }

  conditionalInputForProductTypes(productType) {
    const { size, weight, height, width, length } = this.props;

    switch (productType) {
      case "DVD":
        return <p>Size: {size} MB</p>;
      case "Book":
        return <p>Weight: {weight} KG</p>;
      case "Furniture":
        return <p>Dimensions: {`${height}x${width}x${length}`}</p>;
    }
  }

  render() {
    return (
      <div className="product-container">
        <input
          className="delete-checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.id}
          onChange={this.handleCheckBox}
        />
        <div className="product-info">
          <p className="sku">{this.props.SKU}</p>
          <p className="name">{this.props.name}</p>
          <p className="price">{this.props.price} $</p>

          {this.conditionalInputForProductTypes(this.props.productType)}
        </div>
      </div>
    );
  }
}
