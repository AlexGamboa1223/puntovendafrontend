// src/components/products/ProductCard.tsx

import type { Product } from "@/types/Product";
import { Button } from "../ui/button";

interface Props {
  product: Product;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onDelete, onEdit, onAddToCart }: Props) {
  return (
    <div className="border p-4 rounded shadow-md bg-white flex flex-col justify-between">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-sm text-gray-400 italic">
          Sin imagen
        </div>
      )}

      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700 text-sm mb-1">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <p className="text-xs italic text-blue-500">Categoría: {product.category}</p>

      {/* Botones según contexto */}
      <div className="mt-4 flex flex-col gap-2">
        {onEdit && (
          <Button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Editar
          </Button>
        )}

        {onDelete && (
          <Button
            variant="destructive"
            onClick={() => onDelete(product._id)}
          >
            Eliminar
          </Button>
        )}

        {onAddToCart && (
          <Button
            onClick={onAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Agregar al carrito
          </Button>
        )}
      </div>
    </div>
  );
}
