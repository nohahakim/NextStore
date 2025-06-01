import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoriesDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="inline-flex items-center justify-center p-2.5 rounded-md text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
          variant="ghost"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm rounded-tl-none">
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className="space-y-1 mt-4">
            {categories.map((x) => (
              <Button
                className="w-full justify-start"
                variant="ghost"
                key={x.category}
                asChild
              >
                <DrawerClose asChild>
                  <Link href={`/search?category=${x.category}`}>
                    {x.category} ({x._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoriesDrawer;
