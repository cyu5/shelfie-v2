import React, { Component } from "react";
import "./Header.css";
import icon from "../../icon.png";
import { NavLink } from "react-router-dom";

const Header = function(props) {
  return (
    <div className="Header">
      <img className="logo" src={icon} alt="logo" />
      <h1 className="title">Shelfie</h1>
      <div className="link-box">
        <NavLink to="/" className="link-button">
          Dashboard
        </NavLink>
        <NavLink to="/form" className="link-button">
          Add Inventory
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
