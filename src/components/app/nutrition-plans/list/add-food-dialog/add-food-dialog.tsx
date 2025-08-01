"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddFoodDialogForm from "@/components/app/nutrition-plans/list/add-food-dialog/add-food-dialog-form";
import { useState } from "react";
import { FoodInput } from "@/zod-schemas/food-schemas";

interface Props {
  children?: React.ReactNode;
  onSubmit: (data: FoodInput) => void;
}

const AddFoodDialog = ({ children, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
          <DialogDescription>Add a food to your meal plan</DialogDescription>
        </DialogHeader>
        <AddFoodDialogForm
          onSubmit={onSubmit}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodDialog;
