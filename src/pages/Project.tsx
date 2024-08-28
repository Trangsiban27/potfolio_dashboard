import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../store/slices/projectSlice";
import { TableData } from "@/modules/project/TableData";

const Project = () => {
  const dispatch = useDispatch();
  const { error, message, loading, project } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (message) {
      console.log(message);
    }
    dispatch(getAllProject());
  }, [dispatch, error, message]);

  return (
    <div className="w-full">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink>Project</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base font-semibold">
            <BreadcrumbLink href="/project">All project</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <TableData data={project}></TableData>
      </div>
    </div>
  );
};

export default Project;
