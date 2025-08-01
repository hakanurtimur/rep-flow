"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchFoods } from "@/hooks/food/use-search-foods";
import {
  FoodInput,
  FoodSchema,
  SearchedFood,
} from "@/zod-schemas/food-schemas";
import { SearchBox } from "@/components/ui/search-box/search-box";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCreateFood } from "@/hooks/food/use-create-food";

interface Props {
  closeDialog: () => void;
  onSubmit: (data: FoodInput) => void;
}

const AddFoodDialogForm = ({ closeDialog, onSubmit }: Props) => {
  const [query, setQuery] = useState("");
  const [onSelectSuggestionIsLoading, setOnSelectSuggestionIsLoading] =
    useState(false);
  const [isInternal, setIsInternal] = useState(false);
  const form = useForm<FoodInput>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      name: "",
      carbs: 0,
      calories: 0,
      protein: 0,
      fat: 0,
    },
  });

  const mutation = useCreateFood({
    onSuccess: (data) => {
      onSubmit(data);
      closeDialog();
    },
  });

  async function fetchExternalFoodDetails(fdcId: number) {
    const res = await fetch(`/api/food/details?fdcId=${fdcId}`);
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message);
    return json.data;
  }

  const searchQuery = useSearchFoods(query, query.length >= 2);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (isInternal) {
              onSubmit(data);
              closeDialog();
            } else {
              mutation.mutate(data);
            }
          })}
          className="space-y-4"
        >
          <FormItem>
            <FormLabel>Food Name</FormLabel>
            <SearchBox<SearchedFood>
              onSearch={(q) => setQuery(q)}
              onSelectSuggestion={async (item) => {
                if (item.source === "internal") {
                  setIsInternal(true);
                  form.setValue("name", item.name);
                  form.setValue("calories", item.calories ?? 0);
                  form.setValue("protein", item.protein ?? 0);
                  form.setValue("carbs", item.carbs ?? 0);
                  form.setValue("fat", item.fat ?? 0);
                  form.setValue("id", item.id);
                } else if (item.fdcId) {
                  setOnSelectSuggestionIsLoading(true);
                  const detail = await fetchExternalFoodDetails(item.fdcId);
                  form.setValue("name", detail.name);
                  form.setValue("calories", detail.calories ?? 0);
                  form.setValue("protein", detail.protein ?? 0);
                  form.setValue("carbs", detail.carbs ?? 0);
                  form.setValue("fat", detail.fat ?? 0);
                  setOnSelectSuggestionIsLoading(false);
                }
              }}
              onSelectSuggestionIsLoading={onSelectSuggestionIsLoading}
              suggestions={searchQuery?.data ?? []}
              suggestionKey="name"
              placeholder="Search for food..."
              isLoading={searchQuery.isLoading}
              minLength={2}
            />
          </FormItem>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? null : Number(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbs</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? null : Number(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fat</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? null : Number(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? null : Number(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter
            className={cn("flex flex-row! items-center gap-2 w-full")}
          >
            <DialogClose type="button" asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button loading={mutation.isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default AddFoodDialogForm;
