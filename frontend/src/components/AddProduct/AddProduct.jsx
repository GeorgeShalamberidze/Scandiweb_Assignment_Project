import React, { Component } from "react";
import "../../Styles/AddProduct/AddProduct.css";
import { Link } from "react-router-dom";
import ProductDimension from "../ProductDimension";
import FormInput from "../FormInput";
import { InputValues } from "../../Values";
import { getProducts, postProducts } from "../../getProducts";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      sku: "",
      name: "",
      price: "",
      productType: "",
      height: "",
      width: "",
      length: "",
      size: "",
      weight: "",
      skuValid: true,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      skuValid: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { skuValid, ...restObject } = this.state;
    let objToPost = { ...restObject };
    Object.keys(objToPost).forEach((key) => {
      objToPost[key] = objToPost[key] === "" ? null : objToPost[key];
    });

    getProducts()
      .then((data) => {
        if (data && data.status === 200) {
          const isSkuNotUnique = data.data.some(
            (item) => item.sku === this.state.sku
          );
          if (isSkuNotUnique) {
            this.setState({
              skuValid: false,
            });
          } else {
            postProducts(objToPost)
              .then((data) => {
                if (data && data.status === 200) {
                  this.resetState();
                  this.props.navigate("/");
                }
              })
              .catch((err) => console.error(err));
          }
        }
      })
      .catch((err) => console.error(err));
  }

  handleCancelClick() {
    this.resetState();
  }

  resetState() {
    this.setState({
      sku: "",
      name: "",
      price: "",
      productType: "",
      height: "",
      width: "",
      length: "",
      size: "",
      weight: "",
    });
  }

  render() {
    return (
      <div className="add-product-container">
        <div className="add-product-header">
          <h1 className="page-title">Product Add</h1>
          <div className="button-container">
            <button type="submit" className="save-btn" form="product_form">
              Save
            </button>
            <Link to="/">
              <button className="cancel-btn" onClick={this.handleCancelClick}>
                Cancel
              </button>
            </Link>
          </div>
        </div>
        <hr />

        <form method="post" id="product_form" onSubmit={this.onSubmit}>
          <div className="form-wrapper">
            {InputValues.map((item) => {
              return (
                <div className="input-container" key={item.id}>
                  <FormInput
                    parState={this.state}
                    labelClass={item.labelClassName}
                    idName={item.idName}
                    inputClass={item.inputClassName}
                    name={item.name}
                    value={this.state[item.name]}
                    onChange={this.handleChange}
                    label={item.label}
                    type={item.type}
                    errorMessage={item.errorMessage}
                  ></FormInput>
                </div>
              );
            })}

            <div className="type-switcher-container">
              <label htmlFor={this.state.productType} className="type">
                {" "}
                Choose product type:
              </label>
              <select
                name="productType"
                id="productType"
                required
                onChange={(e) => this.handleChange(e)}
              >
                <option value="">--Please choose an option--</option>
                <option id="DVD" value="DVD">
                  DVD
                </option>
                <option id="Furniture" value="Furniture">
                  Furniture
                </option>
                <option id="Book" value="Book">
                  Book
                </option>
              </select>
            </div>
            <ProductDimension
              state={this.state}
              handleStateChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
