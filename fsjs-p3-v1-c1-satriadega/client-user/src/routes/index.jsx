import BaseLayout from "../components/BaseLayout";

import { createBrowserRouter } from "react-router-dom";
import HomeView from "../views/HomeView";
import DetailView from "../views/DetailView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "/:slug",
        element: <DetailView />,
      },
    ],
  },
]);

export default router;
