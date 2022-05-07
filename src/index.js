import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "./context/theme";
import Nav from "./components/Nav";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import Results from "./components/Results";

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState((state) => ({
        theme: state.theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
