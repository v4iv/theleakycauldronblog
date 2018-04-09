/**
 * Created by vaibhav on 9/4/18
 */
import React, { Component } from "react";
import Link from "gatsby-link";

class Navbar extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {

      // Get all "navbar-burger" elements
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function($el) {
          $el.addEventListener("click", function() {

            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle("is-active");
            $target.classList.toggle("is-active");

          });
        });
      }

    });
  }

  render() {
    const {config} = this.props;
    return (
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item is-uppercase has-text-black" to="/"><strong>{config.siteTitle}</strong></Link>

            <a role="button" className="navbar-burger has-text-black" data-target="navMenu" aria-label="menu"
               aria-expanded="false">
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>
          <div className="navbar-menu" id="navMenu">
            <div className="navbar-end">
              <Link className="navbar-item has-text-black" to="/">
                Home
              </Link>
              <Link className="navbar-item has-text-black" to="/about">
                About
              </Link>
              <Link className="navbar-item has-text-black" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;