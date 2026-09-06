"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);
  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
    <div
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <button
        type="button"
        aria-label={existingProduct ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={Boolean(existingProduct)}
        onClick={handleFavorite}
        className={`p-2.5 rounded-full hover:bg-shop-dark-green/80 hover:text-white hoverEffect  ${existingProduct ? "bg-shop-dark-green/80 text-white" : "bg-lightColor/10"}`}
      >
        <Heart size={15} />
      </button>
    </div>
  );
};

export default ProductSideMenu;
