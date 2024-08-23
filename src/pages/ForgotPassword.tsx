import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useEffect } from "react";
import {
  forgotPasswordChange,
  clearForgotPasswordErrors,
} from "../store/slices/forgotResetPasswordSlice";

const schema = yup.object({
  email: yup.string().email("email không hợp lệ!").required(),
});

type FormData = yup.InferType<typeof schema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleForgotPassword = (data: FormData) => {
    dispatch(forgotPasswordChange(data.email));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      console.log(message);
    }
  }, [dispatch, error]);

  return (
    <div className="bg-[url('./src/asset/bg.jpg')] bg-no-repeat bg-cover bg-center w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to change password to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-2">
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="grid gap-2"
          >
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            <p className="error">{errors.email?.message || error}</p>
            <Button type="submit" className="w-full mt-5">
              Forgot password
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <Link
            to="/login"
            className="inline-block mt-6 ml-auto text-sm underline"
          >
            Back to login page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
