"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewAllProductsButton = () => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/search");
  };

  return (
    <Button
      variant="outline"
      className="w-full md:w-auto"
      onClick={handleViewAll}
    >
      View All Products
    </Button>
  );
};

export default ViewAllProductsButton;
