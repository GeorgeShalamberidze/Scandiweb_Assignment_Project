import React, { Component } from "react";
import AddProduct from "./components/AddProduct/AddProduct.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import "./Styles/App/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route
            path="/addproduct"
            element={<AddProduct navigate={this.props.navigate} />}
          />
        </Routes>
      </div>
    );
  }
}

function AppWithNavigate(props) {
  let navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
}
export default AppWithNavigate;
