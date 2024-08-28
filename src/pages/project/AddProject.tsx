import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormAddProject from "@/modules/project/FormAddProject";
import React from "react";

const AddProject = () => {
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
            <BreadcrumbLink>Add project</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border rounded-lg">
        <div className="p-5 font-semibold text-gray-500 border-b">
          Add Project
        </div>
        <FormAddProject></FormAddProject>
      </div>
    </div>
  );
};

export default AddProject;
