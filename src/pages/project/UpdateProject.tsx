import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormUpdateProject from "@/modules/project/FormUpdateProject";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject } from "../../store/slices/projectSlice";
import { LoaderCircle } from "lucide-react";

const UpdateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, loading } = useSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(getProject(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <LoaderCircle className="transition-all animate-spin" />
      </div>
    ); // Hiển thị loading nếu cần
  }

  if (!project) {
    return <div>No project found</div>; // Xử lý khi không tìm thấy project
  }

  console.log(project);

  return (
    <div>
      <Breadcrumb className="mb-8 ">
        <BreadcrumbList>
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink>Project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink href="/project">All project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base font-semibold">
            <BreadcrumbLink>Update project</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border rounded-lg">
        <div className="p-5 font-semibold text-gray-500 border-b">
          Update Project
        </div>
        <FormUpdateProject project={project}></FormUpdateProject>
      </div>
    </div>
  );
};

export default UpdateProject;
