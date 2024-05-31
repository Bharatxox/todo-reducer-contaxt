import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LandingPageLayout from "./pages/Layout.jsx";
import Todo from "./pages/Todo.jsx";
import { MyContextProvider } from "./context/index.jsx";

function App() {
  // const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/todo",
          element: <Todo />,
        },
      ],
    },
  ]);

  return (
    <MyContextProvider>
      <RouterProvider router={router} />
    </MyContextProvider>
  );
}

export default App;
