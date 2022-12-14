import React, { Component } from "react";
import { DimensionInputValues } from "../Values";
import FormInput from "./FormInput";

export default class ProductDimension extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.state["productType"]) {
      case "Furniture":
        return (
          <>
            {DimensionInputValues.filter(
              (item) =>
                item.name == "height" ||
                item.name == "width" ||
                item.name == "length"
            ).map((item) => {
              return (
                <div className="input-container" key={item.id}>
                  <FormInput
                    parState={this.props.state}
                    labelClass={item.labelClassName}
                    idName={item.idName}
                    inputClass={item.inputClassName}
                    name={item.name}
                    value={this.props.state[item.name]}
                    onChange={this.props.handleStateChange}
                    label={item.label}
                    errorMessage={item.errorMessage}
                    type={item.type}
                  ></FormInput>
                </div>
              );
            })}
          </>
        );
      case "DVD":
        return (
          <>
            {DimensionInputValues.filter((item) => item.name == "size").map(
              (item) => {
                return (
                  <div className="input-container" key={item.id}>
                    <FormInput
                      parState={this.props.state}
                      labelClass={item.labelClassName}
                      idName={item.idName}
                      inputClass={item.inputClassName}
                      name={item.name}
                      value={this.props.state[item.name]}
                      onChange={this.props.handleStateChange}
                      label={item.label}
                      errorMessage={item.errorMessage}
                      type={item.type}
                    ></FormInput>
                  </div>
                );
              }
            )}
          </>
        );
      case "Book":
        return (
          <>
            {DimensionInputValues.filter((item) => item.name == "weight").map(
              (item) => {
                return (
                  <div className="input-container" key={item.id}>
                    <FormInput
                      parState={this.props.state}
                      labelClass={item.labelClassName}
                      idName={item.idName}
                      inputClass={item.inputClassName}
                      name={item.name}
                      avalue={this.props.state[item.name]}
                      onChange={this.props.handleStateChange}
                      label={item.label}
                      errorMessage={item.errorMessage}
                      type={item.type}
                    ></FormInput>
                  </div>
                );
              }
            )}
          </>
        );
    }
  }
}
