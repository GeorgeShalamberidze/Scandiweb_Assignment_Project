import React, { Component } from "react";
import Product from "../Product/Product";
import "../../Styles/ProductList/ProductList.css";
import { Link } from "react-router-dom";
import { deleteProducts, getProducts } from "../../productsAPI";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleCheckedProducts = this.handleCheckedProducts.bind(this);
    this.handleMassDelete = this.handleMassDelete.bind(this);
    this.uncheckAllProducts = this.uncheckAllProducts.bind(this);

    this.state = {
      products: [],
      checkedProductIDs: [],
    };
  }

  handleCheckedProducts(checkedId, checked) {
    if (checked) {
      this.setState({
        checkedProductIDs: [...this.state.checkedProductIDs, checkedId],
      });
    } else {
      this.setState({
        checkedProductIDs: this.state.checkedProductIDs.filter(
          (e) => e !== checkedId
        ),
      });
    }
  }

  componentDidMount() {
    getProducts()
      .then((data) => {
        if (data && data.status === 200) {
          this.setState({
            products: data.data,
          });
        }
      })
      .catch((e) => console.error(e));
  }

  uncheckAllProducts() {
    let checkboxes = document.getElementsByClassName("delete-checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }

  handleMassDelete() {
    if (this.state.checkedProductIDs.length > 0) {
      deleteProducts(this.state.checkedProductIDs)
        .then((res) => {
          if (res && res.status === 200) {
            getProducts().then((data) => {
              if (data && data.status === 200) {
                this.uncheckAllProducts();
                this.setState({
                  products: data.data,
                  checkedProductIDs: [],
                });
              }
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <div className="product-list-container">
        <div className="product-list-header">
          <h1 className="page-title">Product List</h1>
          <div className="button-container">
            <Link to="/addproduct">
              <button id="add-btn">ADD</button>
            </Link>
            <button id="delete-product-btn" onClick={this.handleMassDelete}>
              MASS DELETE
            </button>
          </div>
        </div>
        <hr />
        <div className="product-wrapper">
          {this.state.products.length > 0 ? (
            this.state.products.map((item, idx) => {
              return (
                <Product
                  key={idx}
                  SKU={item.sku}
                  name={item.name}
                  price={Number(item.price)}
                  productType={item.productType}
                  height={item.height}
                  width={item.width}
                  length={item.length}
                  size={item.size}
                  weight={item.weight}
                  id={item.id}
                  checkBox={this.handleCheckedProducts}
                />
              );
            })
          ) : (
            <h1>No Products Added...</h1>
          )}
        </div>
      </div>
    );
  }
}
