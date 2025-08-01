"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormSearchBoxProps {
  name: string;
  onSearch?: (query: string) => void;
  onSelectSuggestion?: (value: string) => void;
  suggestions?: string[];
  label?: string;
  description?: string;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  minLength?: number;
  noResultsLabel?: string;
}

export function FormSearchBox({
  name,
  onSearch,
  onSelectSuggestion,
  suggestions = [],
  label,
  description,
  placeholder = "Search...",
  debounceMs = 300,
  isLoading = false,
  className,
  disabled = false,
  minLength = 0,
  noResultsLabel = "No results found",
}: FormSearchBoxProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!onSearch) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const query = field.value || "";
      if (query.length >= minLength) {
        onSearch(query.trim());
      } else if (query.length === 0) {
        onSearch("");
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [field.value, onSearch, debounceMs, minLength]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e.target.value);
      setHighlightedIndex(-1);
    },
    [field],
  );

  const handleClear = useCallback(() => {
    field.onChange("");
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [field]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClear();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, suggestions.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        const selected = suggestions[highlightedIndex];
        field.onChange(selected);
        onSelectSuggestion?.(selected);
        setHighlightedIndex(-1);
      }
    },
    [handleClear, suggestions, highlightedIndex, field, onSelectSuggestion],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    field.onBlur();
  }, [field]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    field.onBlur();
  }, [field]);

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="relative w-full">
          <div
            className={cn(
              "relative flex items-center transition-all duration-200",
              "rounded-lg border bg-background",
              isFocused && !disabled && "ring-2 ring-ring ring-offset-2",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-destructive",
            )}
          >
            <div className="absolute left-3 flex items-center justify-center">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>

            <Input
              {...field}
              ref={(e) => {
                field.ref(e);
                inputRef.current = e;
              }}
              type="text"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "pl-10 pr-20 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-muted-foreground",
              )}
              aria-label="Search input"
              role="searchbox"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error
                  ? `${name}-error`
                  : description
                    ? `${name}-description`
                    : undefined
              }
            />

            <div className="absolute right-3 flex items-center gap-1">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    disabled={disabled}
                    className="h-6 w-6 p-0 hover:bg-muted rounded-full"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )
              )}
            </div>
          </div>

          {suggestions.length > 0 &&
            isFocused &&
            field.value?.length >= minLength && (
              <ul
                role="listbox"
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-sm shadow"
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion + "-" + index}
                    role="option"
                    aria-selected={highlightedIndex === index}
                    className={cn(
                      "cursor-pointer px-4 py-2 hover:bg-accent",
                      highlightedIndex === index &&
                        "bg-accent text-accent-foreground",
                    )}
                    onMouseDown={() => {
                      field.onChange(suggestion);
                      onSelectSuggestion?.(suggestion);
                      setHighlightedIndex(-1);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

          {suggestions.length === 0 &&
            field.value?.length >= minLength &&
            isFocused && (
              <p className="mt-1 text-sm text-muted-foreground">
                {noResultsLabel}
              </p>
            )}

          {minLength > 0 &&
            field.value &&
            field.value.length > 0 &&
            field.value.length < minLength && (
              <p className="mt-1 text-xs text-muted-foreground">
                Type at least {minLength} characters to search
              </p>
            )}
        </div>
      </FormControl>
      {description && !error && (
        <FormDescription id={`${name}-description`}>
          {description}
        </FormDescription>
      )}
      <FormMessage id={`${name}-error`} />
    </FormItem>
  );
}
