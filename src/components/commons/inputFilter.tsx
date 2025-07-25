import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type InputFilterProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const InputFilter = ({
  value,
  onChange,
  placeholder = "Search countries...",
}: InputFilterProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  );
};

export default InputFilter;
