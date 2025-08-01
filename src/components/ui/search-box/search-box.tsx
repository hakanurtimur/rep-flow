"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBoxProps<T> {
  onSearch: (query: string) => void;
  onSelectSuggestion?: (item: T) => void;
  onSelectSuggestionIsLoading: boolean;
  suggestions?: T[];
  renderSuggestion?: (
    item: T,
    index: number,
    active: boolean,
  ) => React.ReactNode;
  suggestionKey?: keyof T;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  minLength?: number;
}

export function SearchBox<T>({
  onSearch,
  onSelectSuggestion,
  onSelectSuggestionIsLoading,
  suggestions = [],
  renderSuggestion,
  suggestionKey,
  placeholder = "Search...",
  debounceMs = 300,
  isLoading = false,
  defaultValue = "",
  className,
  disabled = false,
  minLength = 0,
}: SearchBoxProps<T>) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
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
  }, [query, onSearch, debounceMs, minLength]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setHighlightedIndex(-1);
    },
    [],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (onSelectSuggestionIsLoading) return;
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        onSelectSuggestion?.(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative flex items-center transition-all duration-200",
          "rounded-lg border bg-background",
          isFocused && !disabled && "ring-2 ring-ring ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <div className="absolute left-3 flex items-center justify-center">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={query}
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
        />

        <div className="absolute right-3 flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={disabled}
                className="h-6 w-6 p-0 hover:bg-muted rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            )
          )}
        </div>
      </div>

      {/* Suggestion List */}
      {(isFocused || onSelectSuggestionIsLoading) && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
          <ul className="max-h-60 overflow-y-auto py-1 text-sm">
            {!onSelectSuggestionIsLoading &&
              suggestions.map((item, index) => {
                const key =
                  suggestionKey && item[suggestionKey]
                    ? String(item[suggestionKey])
                    : `index-${index}`;

                return (
                  <li
                    key={key}
                    onClick={() => {
                      onSelectSuggestion?.(item);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "cursor-pointer px-4 py-2 hover:bg-muted",
                      index === highlightedIndex && "bg-muted",
                    )}
                  >
                    {renderSuggestion
                      ? renderSuggestion(
                          item,
                          index,
                          index === highlightedIndex,
                        )
                      : suggestionKey && item[suggestionKey]
                        ? String(item[suggestionKey])
                        : String(item)}
                  </li>
                );
              })}
            {onSelectSuggestionIsLoading && (
              <div className="h-60 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </ul>
        </div>
      )}

      {minLength > 0 && query.length > 0 && query.length < minLength && (
        <p className="mt-1 text-xs text-muted-foreground">
          Type at least {minLength} characters to search
        </p>
      )}
    </div>
  );
}
