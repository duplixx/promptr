"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AuthButton from "@/components/AuthButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import LoginGithub from "@/components/LoginGithub";
import { registerWithCreds } from "@/actions/auth";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  // level: z.string().min(1, { message: "Please select your level" }),
  // expertise: z.string().min(1, { message: "Please enter your area of expertise" }),
  // learningStyle: z.string().min(1, { message: "Please select your learning style" }),
  // goals: z.array(z.string()).min(1, { message: "Please select at least one goal" }),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await registerWithCreds(formData);
    } catch (error) {
      toast.error("Something went wrong!");
      form.setError("root", {
        message: "Registration failed",
      });
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-white">
      <div className="w-full max-w-xl rounded-3xl bg-black/50 p-20 shadow-lg border border-second">
        <div className="mb-8 text-center">
          <h2 className="text-4xl bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text font-semibold text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join us to start your learning journey
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AuthButton />
          </form>
          <LoginGithub />
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="hover:text-second text-indigo-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
