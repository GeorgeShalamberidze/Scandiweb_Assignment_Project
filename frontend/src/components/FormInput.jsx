import { Component } from "react";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);

    this.state = {
      focused: false,
    };
  }

  handleFocus(e) {
    this.setState({
      focused: true,
    });
  }

  render() {
    return (
      <>
        <label htmlFor={this.props.value} className={this.props.labelClassName}>
          {this.props.label}
        </label>
        <input
          onBlur={this.handleFocus}
          focused={this.state.focused.toString()}
          required
          type={this.props.type}
          id={this.props.idName}
          className={this.props.inputClassName}
          name={this.props.name}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e)}
        />
        <span className="errorMessage">{this.props.errorMessage}</span>
        {this.props.name === "sku" && !this.props.parState.skuValid && (
          <p className="errorMessage">*SKU Should be Unique</p>
        )}
      </>
    );
  }
}
