import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  initialValue: string;
  onSearch: (value: string) => void;
  placeholder: string;
  buttonLabel?: string;
  variant?: "default" | "secondary" | "destructive" | "outline"; // Shadcn button variants
  className?: string;
}

export function SearchInput({
  initialValue,
  onSearch,
  placeholder,
  buttonLabel = "Search",
  variant = "outline",
  className,
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // Allow pressing "Enter" to search
        onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
      />
      <Button
        variant={variant}
        onClick={() => onSearch(value)}
        className={className}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
