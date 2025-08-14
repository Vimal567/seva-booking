import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    autoHideDuration={1000}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);
