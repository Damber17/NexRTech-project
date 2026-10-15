import { Plus } from "lucide-react";
import "../../styles/product-card.css";

export default function ProductCard({ product, onAdd }) {
  const image =
    product.product_image || "https://placehold.co/500x360?text=Product";

  const stockLabel = product.sku || `${product.stock_qty} in stock`;

  return (
    <article className="product-card">
      <img src={image} alt={product.name} />

      <div className="product-card-body">
        <h4>{product.name}</h4>

        <div className="product-bottom">
          <div>
            <strong>
              {product.currency} {Number(product.price).toLocaleString()}
            </strong>
            <small>+ {stockLabel}</small>
          </div>

          <button
            type="button"
            onClick={() => onAdd?.(product)}
            aria-label={`Add ${product.name}`}
          >
            <Plus size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
