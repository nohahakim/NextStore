import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <div className="hidden md:flex relative mx-8">
      <form
        action="/search"
        method="GET"
        className="flex items-center space-x-2"
      >
        <Select name="category">
          <SelectTrigger className="w-[180px] border border-border bg-background text-foreground">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent className="bg-background text-foreground border border-border shadow-lg">
            <SelectItem value="all">All</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.category} value={c.category}>
                {c.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          name="q"
          type="text"
          placeholder="Search for products..."
          className="flex-grow border border-border bg-background text-foreground placeholder-muted-foreground"
        />

        <Button
          type="submit"
          className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent-dark"
        >
          <SearchIcon className="h-5 w-5" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
