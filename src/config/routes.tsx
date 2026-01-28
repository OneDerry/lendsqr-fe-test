import { createBrowserRouter } from "react-router";
import Login from "../domain/auth/components/login";
import RootLayout from "../shared/components/layouts/rootlayout";
import Users from "../domain/users/components/users";
import ViewUser from "../domain/users/components/view_user";
import NotFound from "../shared/components/common/not_found";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },

      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <ViewUser />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
