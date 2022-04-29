import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import "./index.css";

import Popular from "./components/Popular";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    );
  }
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
