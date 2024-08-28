import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { addTimeline } from "../../store/slices/timelineSlice";

const schema = yup.object({
  title: yup.string().required("title is required"),
  time: yup.string().required("time is required"),
  content: yup.string().required("content is required"),
  image: yup.mixed<FileList>().required("image is required"),
});

type FormData = yup.InferType<typeof schema>;

const FormAddTimeline = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.timeline);

  const handleAdd = (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("time", data.time);
    formData.append("content", data.content);

    // Kiểm tra dữ liệu banner
    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      formData.append("image", file);
    }

    dispatch(addTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (message) {
      console.log("message: ", message);
      toast.success("Add timeline successfully!");
      navigateTo("/timeline");
    }
  }, [error, isAuthenticated, message, navigateTo]);

  return (
    <form
      onSubmit={handleSubmit(handleAdd)}
      className="flex flex-col p-5 gap-y-5"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">
          Title <span className="text-error">*</span>
        </Label>
        <Input
          {...register("title")}
          type="text"
          id="title"
          placeholder="Title"
        />
        <p className="error">{errors.title?.message}</p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="time">
          Time <span className="text-error">*</span>
        </Label>
        <Input {...register("time")} placeholder="Time" id="time" />
        <p className="error">{errors.time?.message}</p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="content">
          Content <span className="text-error">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor value={field.value} onChange={field.onChange}></Editor>
          )}
        />
        <p className="error">{errors.content?.message}</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="image">
          Image <span className="text-error">*</span>
        </Label>
        <Input
          {...register("image")}
          type="file"
          id="image"
          accept="image/jpeg, image/png, image/gif"
          placeholder="image"
        />
        <p className="error">{errors.image?.message}</p>
      </div>
      <Button
        type="submit"
        className="inline-flex w-[100px]"
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className="transition-all animate-spin" />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};

export default FormAddTimeline;
