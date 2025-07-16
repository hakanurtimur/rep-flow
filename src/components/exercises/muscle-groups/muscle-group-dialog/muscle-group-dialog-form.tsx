"use client";

import { useForm } from "react-hook-form";
import {
  CreateUpdateMuscleGroup,
  CreateUpdateMuscleGroupSchema,
} from "@/zod-schemas/muscle-group-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuscleGroup } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateMuscleGroup } from "@/hooks/muscle-group/use-create-muscle-group";
import { toast } from "sonner";
import { useUpdateMuscleGroup } from "@/hooks/muscle-group/use-update-muscle-group";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDeleteMuscleGroup } from "@/hooks/muscle-group/use-delete-muscle-group";

interface Props {
  model?: MuscleGroup;
  variant: "edit" | "create";
  closeDialog: () => void;
}

const MuscleGroupDialogForm = ({ variant, model, closeDialog }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const form = useForm<CreateUpdateMuscleGroup>({
    resolver: zodResolver(CreateUpdateMuscleGroupSchema),
    defaultValues: {
      id: model?.id ?? undefined,
      name: model?.name ?? "",
    },
  });

  const mutation = useCreateMuscleGroup({
    onSuccess: () => {
      toast("Muscle group saved successfully!");
      closeDialog();
    },
  });

  const updateMutation = useUpdateMuscleGroup({
    onSuccess: () => {
      toast("Muscle group updated successfully!");
      closeDialog();
    },
  });

  const deleteMutation = useDeleteMuscleGroup({
    onSuccess: () => {
      toast("Muscle group deleted successfully!");
      setIsDeleteDialogOpen(false);
      closeDialog();
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (variant === "create") {
              mutation.mutate(data.name);
            } else {
              updateMutation.mutate({
                id: data.id!,
                name: data.name,
              });
            }
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muscle Group Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter
            className={cn("flex flex-row! items-center gap-2 w-full")}
          >
            <DialogClose type="button" asChild>
              <Button
                variant="outline"
                disabled={
                  mutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending
                }
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              loading={mutation.isPending || updateMutation.isPending}
              disabled={deleteMutation.isPending}
              type="submit"
            >
              Save
            </Button>
            {variant === "edit" && (
              <DeleteAlertDialog
                title="Delete Muscle Group"
                description="Are you sure you want to delete this muscle group? This action cannot be undone."
                onDelete={() => {
                  if (model) {
                    deleteMutation.mutate(model.id);
                  }
                }}
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                disabled={
                  mutation.isPending ||
                  updateMutation.isPending ||
                  deleteMutation.isPending
                }
                loading={deleteMutation.isPending}
              >
                <Button
                  disabled={
                    mutation.isPending ||
                    updateMutation.isPending ||
                    deleteMutation.isPending
                  }
                  variant={"destructive"}
                  type="button"
                >
                  Delete
                </Button>
              </DeleteAlertDialog>
            )}
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default MuscleGroupDialogForm;
