import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";

const Home = () => <h2>Home Page</h2>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
