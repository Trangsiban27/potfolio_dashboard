import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TableDataTimeline from "@/modules/timeline/TableDataTimeline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimeline } from "../../store/slices/timelineSlice";

const Timeline = () => {
  const dispatch = useDispatch();
  const { error, message, timeline } = useSelector((state) => state.timeline);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (message) {
      console.log(message);
    }
    dispatch(getAllTimeline());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem className="text-base">
            <BreadcrumbLink>Timeline</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-base font-semibold">
            <BreadcrumbLink href="/project">All timeline</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <TableDataTimeline data={timeline}></TableDataTimeline>
      </div>
    </div>
  );
};

export default Timeline;
