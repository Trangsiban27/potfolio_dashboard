import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email("email không hợp lệ!").required(),
    password: yup.string().min(8, "mật khẩu phải ít nhất 8 kí tự").required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (data: FormData) => {
    dispatch(login(data.email, data.password));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    // dispatch(clearAllUserErrors());
  }, [error, isAuthenticated, loading]);

  return (
    <div className="bg-[url('./src/asset/bg.jpg')] bg-no-repeat bg-cover bg-center w-full h-full flex items-center justify-center">
      <Card className="max-w-sm mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="grid gap-4 text-start"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // required
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // required
                {...register("password")}
              />
              <p className="error">{errors.password?.message || error}</p>
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="text-center">
            <Link
              to="/password/forgot"
              className="inline-block mt-6 ml-auto text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
