import React, { Component } from "react";
import "../../Styles/Product/Product.css";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.state = {
      asd: false,
    };
    console.log(this.state);

    setTimeout(() => {
      let checkboxes = document.getElementsByClassName("delete-checkbox");
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        checkboxes[i].defaultChecked = true;
      }
      console.log("NOW");
      console.log(this.state);
    }, 2000);
  }

  handleCheckBox(e) {
    console.log(1);
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
      default:
        break;
    }
  }

  render() {
    const { SKU, name, price } = this.props;
    return (
      <div className="product-container">
        <input
          className="delete-checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.id}
          onChange={this.handleCheckBox}
          checked={this.state.asd}
        />
        <div className="product-info">
          <p className="sku">{SKU}</p>
          <p className="name">{name}</p>
          <p className="price">{price} $</p>

          {this.conditionalInputForProductTypes(this.props.productType)}
        </div>
      </div>
    );
  }
}
