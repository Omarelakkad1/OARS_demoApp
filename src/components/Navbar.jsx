import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { Navmenuitems } from "./Navmenuitems"; 

class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">OARS</h1>
                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {Navmenuitems.map((item, index) => {
                        if (item.title !== "") {
                            return (
                                <li key={index}>
                                    <Link to={item.url} className={item.cName}>
                                        <i className={item.icon}></i>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </nav>
        );
    }
}

export default Navbar;
