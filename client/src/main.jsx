import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.styles.scss";
import App from "./App.jsx";
import store from "./redux/stores";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
