import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";

import Popular from "./components/Popular";
import Battle from "./components/Battle";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
