import * as React from "react";

const ThemeContext = React.createContext("dark");

export default ThemeContext;
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
