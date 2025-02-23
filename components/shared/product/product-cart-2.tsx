import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";

interface Product {
  slug: string;
  images: string[];
  name: string;
  brand: string;
  rating?: number;
  reviewsCount?: number;
  price: number;
  stock?: number;
  variants?: string[];
  status?: "new" | "sale" | "featured";
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? (
        <FaStar key={i} className="w-4 h-4 text-amber-400 drop-shadow-sm" />
      ) : (
        <FaRegStar
          key={i}
          className="w-4 h-4 text-gray-300/80 dark:text-gray-600"
        />
      )
    );
  };

  const statusColors = {
    new: "from-blue-500 to-cyan-400",
    sale: "from-red-500 to-rose-400",
    featured: "from-emerald-500 to-teal-400",
  };

  const isInStock = product.stock && product.stock > 0;

  return (
    <article className="group w-full max-w-sm rounded-xl shadow-xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden isolate relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {product.status && (
          <div
            className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${
              statusColors[product.status]
            } text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md`}
          >
            {product.status}
          </div>
        )}

        {/* <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:scale-110 hover:text-red-500 transition-all duration-300">
          <FaHeart className="w-5 h-5" />
        </button> */}

        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square"
        >
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            width={480}
            height={480}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          />

          {/* Secondary Image: Only show if exists */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              width={480}
              height={480}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          )}

          {/* Optional gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
            {product.brand}
          </span>
          {product.variants && (
            <div className="flex gap-2">
              {product.variants.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-accent dark:hover:text-accent-light transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.rating !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 [&>svg]:hover:scale-110 [&>svg]:transition-transform">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              ({product.reviewsCount?.toLocaleString() ?? 0})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span
            className={`text-2xl font-bold ${
              isInStock ? "text-gray-900 dark:text-white" : "text-red-500"
            } transition-all`}
          >
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={!isInStock}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isInStock
                ? "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-lg hover:-translate-y-0.5"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isInStock ? "Add to Cart 🛒" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Hover Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 shadow-[inset_0_0_48px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_48px_rgba(255,255,255,0.08)] rounded-xl" />
      </div>
    </article>
  );
};

export default ProductCard;
