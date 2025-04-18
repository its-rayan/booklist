import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { LoginFormData } from "../interfaces";

type Props = {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
};

const LoginForm: React.FC<Props> = ({ form, onSubmit }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
);

export default LoginForm;
