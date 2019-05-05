import React, { Component } from "react";
import "./Form.css";
import { Link } from "react-router-dom";

class Form extends Component {
  componentWillUnmount() {
    this.props.onClearForm();
  }

  handleSubmit = _ => {
    this.props.onSubmit(this.props.id);
  };

  handleImageChange = event => {
    this.props.onInputChange("image", event.target.value);
  };
  handleNameChange = event => {
    this.props.onInputChange("name", event.target.value);
  };
  handlePriceChange = event => {
    this.props.onInputChange("price", event.target.value);
  };

  render() {
    return (
      <div className="Form">
        <img className="form_img_preview" src={this.props.form.image} alt="" />
        <p>image url</p>
        <input
          value={this.props.form.image}
          onChange={this.handleImageChange}
        />
        <p>name</p>
        <input value={this.props.form.name} onChange={this.handleNameChange} />
        <p>price</p>
        <input
          value={this.props.form.price}
          onChange={this.handlePriceChange}
        />
        <div className="form_button_box">
          <button onClick={this.props.onClearForm}>
            <Link to="/">Cancel</Link>
          </button>
          <button onClick={this.handleSubmit}>
            <Link to="/">Submit</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
