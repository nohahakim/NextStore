import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/product/product-price";
import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductImages from "@/components/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";

export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();

  // If product.price is a Prisma Decimal, call `.toNumber()`.
  // If it's a string, you can use Number(product.price) or parseFloat(product.price).
  const priceAsNumber =
    typeof product.price === "string"
      ? Number(product.price)
      : // @ts-expect-error: Decimal has toNumber()
        product.price.toNumber?.() ?? Number(product.price);

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 p-10">
        <ProductImages images={product.images} />

        {/* Product Details */}
        <div className="space-y-8">
          {/* Title and Rating */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-4xl font-bold text-brand-dark dark:text-white mt-4 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">
                {Number(product.rating)} of {product.numReviews} reviews
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price and Stock */}
            <div className="bg-gradient-to-r from-brand-light/10 to-brand/10 dark:from-brand-dark/10 dark:to-brand-dark/10 p-6 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-brand dark:text-brand-light">
                  <ProductPrice
                    value={priceAsNumber}
                    className="text-4xl font-bold"
                  />
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    product.stock > 0 ? "bg-secondary" : "bg-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-xl font-bold text-brand-dark dark:text-white">
              Product Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            {product.stock > 0 && (
              <AddToCart
                cart={cart}
                item={{
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: priceAsNumber, // <-- ensure this is a number
                  qty: 1,
                  image: product.images![0],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
