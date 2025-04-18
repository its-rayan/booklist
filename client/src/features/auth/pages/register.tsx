import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../layout";
import RegisterForm from "../forms/register-form";
import { registerFormSchema } from "../schemas";
import type { RegisterFormData } from "../interfaces";

const Register = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      console.log(data);
      return fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <AuthLayout>
      {/* Heading */}
      <div className="border-b border-b-neutral-200 pb-4 mb-4">
        <h1 className="text-xl font-medium">Register</h1>
        <p className="text-neutral-500">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline">Login</span>
          </Link>{" "}
          .
        </p>
      </div>

      {/* Form */}
      <RegisterForm form={form} onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Register;
