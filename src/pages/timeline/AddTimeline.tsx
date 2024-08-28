import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormAddTimeline from "@/modules/timeline/FormAddTimeline";

const AddTimeline = () => {
  return (
    <div>
      <Breadcrumb className="mb-8 ">
        <BreadcrumbList>
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink>Timeline</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink href="/project">All timeline</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base font-semibold">
            <BreadcrumbLink>Add timeline</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border rounded-lg">
        <div className="p-5 font-semibold text-gray-500 border-b">
          Add Timeline
        </div>
        <FormAddTimeline></FormAddTimeline>
      </div>
    </div>
  );
};

export default AddTimeline;
