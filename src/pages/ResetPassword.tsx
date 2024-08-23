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
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  resetPassword,
  clearForgotPasswordErrors,
} from "../store/slices/forgotResetPasswordSlice";
import { useEffect } from "react";

const schema = yup.object({
  password: yup.string().min(8, "mật khẩu phải ít nhất 8 kí tự").required(),
  confirmPassword: yup
    .string()
    .min(8, "mật khẩu phải ít nhất 8 kí tự")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required(),
});

type FormData = yup.InferType<typeof schema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { token } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);

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
      navigateTo("/login");
    }
  }, [dispatch, error, isAuthenticated, message, navigateTo]);

  const handleResetPassword = (data: FormData) => {
    dispatch(resetPassword(token, data.password, data.confirmPassword));
  };

  return (
    <div className="bg-[url('./src/asset/bg.jpg')] bg-no-repeat bg-cover bg-center w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password and confirm password below to change
            password to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pb-2">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="grid gap-4 text-start"
          >
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input type="password" {...register("confirmPassword")} />
              <p className="error">{errors.password?.message || error}</p>
            </div>
            <Button type="submit" className="w-full">
              Reset password
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

export default ResetPassword;
