import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  RootLayout,
  ErrorPage,
  LandingPage,
  CheckoutPage,
  IngredientsPage,
  IngredientDetailPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "ingredients", element: <IngredientsPage /> },
      { path: "ingredients/:ingredientId", element: <IngredientDetailPage /> },
      { path: "order", element: <CheckoutPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
