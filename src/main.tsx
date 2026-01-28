import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import router from "./config/routes.tsx";
import store from "./redux/store.ts";
import Login from "./domain/auth/components/login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Login />
    </Provider>
  </StrictMode>,
);
