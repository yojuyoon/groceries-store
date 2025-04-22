import Link from 'next/link';
import { Button } from './ui/button';

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  in_stock: number;
  image_url?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
        <img
          src={product.image_url || '/no-image.png'}
          alt={product.name}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-base font-bold mt-1">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">{product.unit}</p>
        </div>
        <p className="text-sm text-gray-500">
          {product.in_stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        <Button
          disabled={product.in_stock === 0}
          className={`mt-3 w-full px-4 py-2 rounded text-white font-medium bg-green-600 ${
            product.in_stock > 0 ? '' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {product.in_stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Link>
  );
}
