import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      {" "}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-brand-dark   dark:text-white">
        Newest Arrivals
      </h2>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {limitedData.map((product: any) => (
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
