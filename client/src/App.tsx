import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = () => (
  <main>
    <nav className="px-10 pt-5">
      <ul className="flex items-center gap-4 justify-self-end">
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </nav>
    <div className="flex flex-col items-center h-screen mt-10">
      <h1 className="text-xl">Home Page</h1>
      <p className="mt-4">
        This is the home page of our application. You can navigate to the login
        or register pages using the links above.
      </p>
    </div>
  </main>
);

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
