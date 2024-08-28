import { BadgePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
};

const AddButton: React.FC<Props> = ({ to }) => {
  return (
    <Link
      to={to}
      className="px-5 py-2 ml-3 text-white rounded-lg group bg-primary"
    >
      <BadgePlus className="transition-all group-hover:rotate-180" />
    </Link>
  );
};

export default AddButton;
