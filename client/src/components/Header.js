import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper green lighten-2">
          <a href="/" className="center brand-logo">feedbackMonkey</a>
          <ul className="right">
            <li><a href="/auth/google">Sign In with Google</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
