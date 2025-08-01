"use client";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "./date-time-picker";

interface FormDateTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;

  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dateDisabled?: boolean;
}

export function FormDateTimePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  className,
  dateDisabled,
}: FormDateTimePickerProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <DateTimePicker
              date={field.value ? new Date(field.value) : undefined}
              onDateChange={(date) => {
                field.onChange(date);
              }}
              placeholder={placeholder}
              disabled={disabled}
              dateDisabled={dateDisabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
