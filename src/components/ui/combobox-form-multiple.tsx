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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

type MultiSelectProps<TOption, TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  options: TOption[];
  valueField: keyof TOption;
  labelField: keyof TOption;
};

export function ComboboxFormMultiple<
  TOption,
  TFieldValues extends FieldValues,
>({
  name,
  label,
  options,
  valueField,
  labelField,
}: MultiSelectProps<TOption, TFieldValues>) {
  const { control, setValue, getValues } = useFormContext<TFieldValues>();
  const selected = getValues(name) as TOption[keyof TOption][];

  const toggleSelect = (val: TOption[keyof TOption]) => {
    const isSelected = selected?.includes(val);
    const newValues = isSelected
      ? selected?.filter((v) => v !== val)
      : [...(selected || []), val];

    setValue(name, newValues as any, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[240px] justify-between",
                    !field.value?.length && "text-muted-foreground",
                  )}
                >
                  <div className="flex gap-1 flex-wrap max-w-[180px] overflow-hidden">
                    {selected?.length
                      ? selected.map((val, i) => {
                          const item = options.find(
                            (o) => o[valueField] === val,
                          );
                          return (
                            <span
                              key={i}
                              className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full"
                            >
                              {item?.[labelField] as ReactNode}
                            </span>
                          );
                        })
                      : "Select options"}
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                />
                <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const val = option[valueField];
                      const labelValue = option[labelField];

                      return (
                        <CommandItem
                          key={String(val)}
                          value={String(val)}
                          onSelect={() => toggleSelect(val)}
                        >
                          {labelValue as ReactNode}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selected?.includes(val)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
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
