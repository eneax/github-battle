import * as React from "react";
import { NavLink } from "react-router-dom";

import { ThemeConsumer } from "../context/theme";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            className="btn-clear"
            style={{ fontSize: 30 }}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🔦" : "💡"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
