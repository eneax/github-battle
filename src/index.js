import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";

import { ThemeProvider } from "./context/theme";
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
      <ThemeProvider value={this.state}>
        <div className="container">
          <Battle />
        </div>
      </ThemeProvider>
    );
  }
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
