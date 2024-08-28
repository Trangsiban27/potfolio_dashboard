import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

const schema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  content: yup.string().required("content is required"),
  githubLink: yup.string().required("github link is required"),
  technologies: yup.string().required("technologies is required"),
  banner: yup.mixed<FileList>().notRequired(),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  project: {
    banner: {
      public_id: string;
      url: string;
    };
    content: string;
    title: string;
    description: string;
    githubLink: string;
    technologies: string;
    _id: string;
  };
};

const FormUpdateProject: React.FC<Props> = ({ project }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.project);

  console.log(project);

  useEffect(() => {
    if (project) {
      // Set default values for the form
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("content", project.content);
      setValue("githubLink", project.githubLink);
      setValue("technologies", project.technologies);
      // For file inputs, it's a bit tricky as you can't directly set file input value,
      // but you can handle it as needed in the form submission logic.
    }
  }, [project, setValue]);

  const handleUpdate = (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("githubLink", data.githubLink);
    formData.append("technologies", data.technologies);

    // Kiểm tra dữ liệu banner
    if (data.banner && data.banner.length > 0) {
      const file = data.banner[0];
      formData.append("banner", file);
    } else if (project.banner) {
      formData.append("banner", project.banner.url); // Include existing banner URL
    }

    dispatch(updateProject(project._id, formData));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(error);
    }
    if (error) {
      console.log(error);
    }
    if (message) {
      console.log(message);
      toast.success("Update project successfully!");
      navigateTo("/project");
    }
  }, [error, isAuthenticated, navigateTo]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
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
        <Label htmlFor="description">
          Description <span className="text-error">*</span>
        </Label>
        <Textarea
          {...register("description")}
          placeholder="Enter Description here."
          id="description"
        />
        <p className="error">{errors.description?.message}</p>
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
        <Label htmlFor="githubLink">
          Github link <span className="text-error">*</span>
        </Label>
        <Input
          {...register("githubLink")}
          type="text"
          id="githubLink"
          placeholder="githubLink"
        />
        <p className="error">{errors.githubLink?.message}</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="technologies">
          Technologies <span className="text-error">*</span>
        </Label>
        <Input
          {...register("technologies")}
          type="text"
          id="technologies"
          placeholder="technologies"
        />
        <p className="error">{errors.technologies?.message}</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="banner">
          Banner <span className="text-error">*</span>
        </Label>
        <Input
          {...register("banner")}
          type="file"
          id="banner"
          accept="image/jpeg, image/png, image/gif"
          placeholder="banner"
        />
        <p className="error">{errors.banner?.message}</p>
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

export default FormUpdateProject;
