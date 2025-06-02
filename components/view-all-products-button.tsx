import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ViewAllProductsButton() {
  return (
    <div className="flex justify-center items-center my-8">
      <Button
        asChild
        className="
      
      px-8 py-4 text-lg font-semibold
   bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white   hover:shadow-brand/30"
      >
        <Link href="/search">View All Products</Link>
      </Button>
    </div>
  );
}
