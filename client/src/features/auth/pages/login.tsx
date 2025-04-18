import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AuthLayout from "../layout";

const Login = () => {
  const form = useForm({
    defaultValues: {
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
        <h1 className="text-xl font-medium">Login Page</h1>
        <p className="text-neutral-500">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="underline">Register</span>
          </Link>{" "}
          .
        </p>
      </div>
      {/* Heading */}

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full cursor-pointer" type="submit">
            Login
          </Button>
        </form>
      </Form>
      {/* Form */}
    </AuthLayout>
  );
};

export default Login;
