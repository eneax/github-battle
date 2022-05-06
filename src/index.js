import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "./context/theme";
import Nav from "./components/Nav";
import Popular from "./components/Popular";
import Battle from "./components/Battle";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <Route exact path="/" component={Popular} />
              <Route path="/battle" component={Battle} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
