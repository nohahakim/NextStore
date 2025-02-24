import ProductCard from "./product-card";
import { Product } from "@/types";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      {" "}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-brand-dark   dark:text-white">
        {title || "Neweset Arrivals"}{" "}
      </h2>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {limitedData.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
