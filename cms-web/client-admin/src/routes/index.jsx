import CategoryView from "../views/CategoryView";
import PostView from "../views/PostView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import BaseLayout from "../components/BaseLayout";

import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "",
        element: <PostView />,
      },
      {
        path: "/categories",
        element: <CategoryView />,
      },
      {
        path: "/register",
        element: <RegisterView />,
      },
    ],
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.getItem("access_token")) throw redirect("/");
      return null;
    },
    element: <LoginView />,
  },
]);

export default router;
