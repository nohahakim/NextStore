"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-6 ">
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 animate-fade-in">
        <Image
          src={images[current]}
          alt="Product Image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {images?.map((image, index) => (
          <div
            key={image}
            className={cn(
              "flex-shrink-0 w-24 h-24  border  hover:border-orange-600 cursor-pointer transition-all",
              current === index && "border-orange-500"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image}
              width={100}
              height={100}
              className=" object-cover rounded-lg"
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
