import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type Props = {
  open: boolean;
  onChange: () => void;
};

const AlertDialogDelete: React.FC<Props> = ({ open, onChange }) => {
  return <div></div>;
};

export default AlertDialogDelete;
