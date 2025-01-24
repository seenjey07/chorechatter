import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <h1 className="headerTitle">
        <img className="logo" src={logo} alt="ChoreChatter Logo" />
        ChoreChatter
      </h1>
    </header>
  );
};

export default Header;
