"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

type Props<TOption, TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options?: TOption[];
  valueField: keyof TOption & string;
  labelField: keyof TOption & string;
};

export function ComboboxFormSingle<TOption, TFieldValues extends FieldValues>({
  form,
  name,
  label,
  options,
  valueField,
  labelField,
}: Props<TOption, TFieldValues>) {
  if (!options) {
    return (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Skeleton className="h-8 w-full" />
      </FormItem>
    );
  }
  const fieldValue = form.watch(name) as unknown;

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !fieldValue && "text-muted-foreground",
                  )}
                >
                  {String(
                    options.find(
                      (opt) => String(opt[valueField]) === String(fieldValue),
                    )?.[labelField] ?? `Select ${label}`,
                  )}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={String(option[valueField])}
                        value={String(option[labelField])}
                        onSelect={() =>
                          form.setValue(name, option[valueField] as any)
                        }
                      >
                        {String(option[labelField])}
                        <Check
                          className={cn(
                            "ml-auto",
                            String(option[valueField]) === String(fieldValue)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
