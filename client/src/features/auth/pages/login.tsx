import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../layout";
import LoginForm from "../forms/login-form";
import { API_AUTH_URL, PAGE_URL } from "@/constants/domains";
import { loginFormSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../interfaces";

const Login = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      return fetch(`${API_AUTH_URL}/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });
    },
    onSuccess: (response) => {
      // save the token to local storage
      localStorage.setItem("token", response.data);

      // redirect to the home page
      window.location.href = `${PAGE_URL.HOME}`;
    },
  });

  const onSubmit = (data: LoginFormData) => mutation.mutate(data);

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="border-b border-b-neutral-200 pb-4 mb-4">
        <h1 className="text-xl font-medium">Login Page</h1>
        <p className="text-neutral-500">
          Don't have an account?{" "}
          <Link to={`${PAGE_URL.REGISTER}`}>
            <span className="underline">Register</span>
          </Link>{" "}
          .
        </p>
      </div>

      {/* Form */}
      <LoginForm form={form} onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Login;
