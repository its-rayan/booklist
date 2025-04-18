import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../layout";
import RegisterForm from "../forms/register-form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." })
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be less than 255 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain at least one number, one uppercase, and one lowercase letter"
    ),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
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
