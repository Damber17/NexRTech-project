import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Archive,
  Check,
  ExternalLink,
  ImagePlus,
  MoreHorizontal,
  Save,
  Trash2,
} from "lucide-react";
import { getProducts, setProducts } from "../data/catalog";
import "../styles/product-details.css";

const FALLBACK = {
  compare_at_price: 2.8,
  production_date: "",
  expiry_date: "",
  reserved: 16,
  on_hand: 164,
  charge_tax: true,
  track_inventory: true,
  continue_out_of_stock: false,
};

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useMemo(() => getProducts(), []);
  const product = products.find((item) => String(item.id) === String(productId)) || products[0];

  const [draft, setDraft] = useState({ ...FALLBACK, ...product });
  const [adjustment, setAdjustment] = useState(20);
  const [reason, setReason] = useState("Stock received");
  const [saved, setSaved] = useState(true);
  const [activeTab, setActiveTab] = useState("Details & inventory");

  useEffect(() => {
    setDraft({ ...FALLBACK, ...product });
  }, [product]);

  const available = Number(draft.stock_qty || 0);
  const onHand = Number(draft.on_hand || available + Number(draft.reserved || 0));
  const reserved = Number(draft.reserved || 0);
  const nextAvailable = Math.max(0, available + Number(adjustment || 0));

  function change(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveChanges() {
    const next = getProducts().map((item) =>
      String(item.id) === String(product.id) ? { ...item, ...draft } : item
    );
    setProducts(next);
    setSaved(true);
  }

  function archiveProduct() {
    change("status", "Archived");
    const next = getProducts().map((item) =>
      String(item.id) === String(product.id)
        ? { ...item, ...draft, status: "Archived" }
        : item
    );
    setProducts(next);
    navigate("/merchant/products");
  }

  function applyAdjustment() {
    setDraft((current) => ({
      ...current,
      stock_qty: nextAvailable,
      on_hand: Number(current.on_hand || onHand) + Number(adjustment || 0),
    }));
    setSaved(false);
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => change("product_image", reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <div>
          <button className="text-back" onClick={() => navigate("/merchant/products")}>← All products</button>
          <div className="title-line">
            <h1>{draft.name}</h1>
            <span className="published-chip">• {draft.status || "Published"}</span>
          </div>
          <p className="saved-line"><Check size={14} /> {saved ? "Saved product" : "Unsaved changes"} · Updated today at 09:41 by Alex Morgan</p>
        </div>
        <div className="product-detail-actions">
          <button className="detail-outline"><ExternalLink size={15} /> View product</button>
          <button className="detail-outline"><MoreHorizontal size={16} /> More</button>
          <button className="detail-primary" onClick={saveChanges}><Save size={15} /> Save changes</button>
        </div>
      </div>

      <div className="detail-tabs">
        {["Details & inventory", "Channel listings", "Activity"].map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>

      <div className="product-detail-grid">
        <div className="detail-main-column">
          <section className="detail-card">
            <h2>Product information</h2>
            <label>Product name *</label>
            <input value={draft.name} onChange={(e) => change("name", e.target.value)} />
            <label>Description</label>
            <textarea rows="4" value={draft.description || "Fresh, locally sourced whole milk in a convenient 500ml bottle. Pasteurized for quality and taste. Keep refrigerated at 2–4°C and consume within 3 days of opening."} onChange={(e) => change("description", e.target.value)} />
          </section>

          <section className="detail-card">
            <h2>Product images</h2>
            <div className="image-manager">
              <div className="cover-image-wrap">
                <img src={draft.product_image || "/mock-images/milk.svg"} alt={draft.name} />
                <div><span>Cover image</span><button onClick={() => change("product_image", "")}><Trash2 size={13} /></button></div>
              </div>
              <label className="image-drop">
                <ImagePlus size={25} />
                <strong>Add images</strong>
                <small>JPG, PNG or WebP · Up to 10 MB</small>
                <input hidden type="file" accept="image/*" onChange={handleImage} />
              </label>
            </div>
          </section>

          <section className="detail-card">
            <h2>Production & expiry details</h2>
            <p className="card-subtitle">Add the production/manufacture date and expiry date for this milk product.</p>
            <div className="two-fields">
              <label>Production date<input type="date" value={draft.production_date || ""} onChange={(e) => change("production_date", e.target.value)} /></label>
              <label>Expiry date<input type="date" value={draft.expiry_date || ""} onChange={(e) => change("expiry_date", e.target.value)} /></label>
            </div>
          </section>

          <section className="detail-card">
            <h2>Pricing</h2>
            <p className="card-subtitle">Current saved price. Changes apply to all 3 connected channels.</p>
            <div className="two-fields">
              <label>Selling price *<div className="money-input"><span>KES</span><input type="number" step="0.01" value={draft.price} onChange={(e) => change("price", Number(e.target.value))} /></div></label>
              <label>Compare-at price<div className="money-input"><span>KES</span><input type="number" step="0.01" value={draft.compare_at_price} onChange={(e) => change("compare_at_price", Number(e.target.value))} /></div></label>
            </div>
            <div className="pricing-row"><label className="check-row"><input type="checkbox" checked={draft.charge_tax} onChange={(e) => change("charge_tax", e.target.checked)} /> Charge applicable tax</label><button className="detail-outline" onClick={() => setSaved(false)}>Update price</button></div>
            <div className="price-saved"><Check size={14} /> KES {Number(draft.price).toFixed(2)} saved and synced · No pending price changes</div>
          </section>

          <section className="detail-card inventory-card">
            <h2>Inventory controls</h2>
            <p className="card-subtitle">Main warehouse · Stock is shared across all sales channels.</p>
            <div className="inventory-summary"><div><span>On hand</span><strong>{onHand}</strong></div><div><span>Reserved</span><strong>{reserved}</strong></div><div><span>Available</span><strong className="green-number">{available}</strong></div></div>
            <div className="two-fields adjustment-fields">
              <label>Adjust quantity<input type="number" value={adjustment} onChange={(e) => setAdjustment(Number(e.target.value))} /></label>
              <label>Adjustment reason<select value={reason} onChange={(e) => setReason(e.target.value)}><option>Stock received</option><option>Stock correction</option><option>Damaged stock</option><option>Return received</option></select></label>
            </div>
            <div className="adjustment-preview"><div>Available: {available} → {nextAvailable}<small>Preview only · Adjustment not applied</small></div><button className="detail-primary" onClick={applyAdjustment}>Apply adjustment</button></div>
            <div className="switch-row"><div><strong>Track inventory</strong><span>Automatically deduct stock when an order is placed.</span></div><button className={draft.track_inventory ? "switch on" : "switch"} onClick={() => change("track_inventory", !draft.track_inventory)}><span /></button></div>
            <div className="switch-row"><div><strong>Continue selling when out of stock</strong><span>Backorders are currently disabled.</span></div><button className={draft.continue_out_of_stock ? "switch on" : "switch"} onClick={() => change("continue_out_of_stock", !draft.continue_out_of_stock)}><span /></button></div>
          </section>
        </div>

        <aside className="detail-side-column">
          <section className="detail-card organization-card">
            <h2>Organization</h2>
            <label>Category *</label>
            <select value={draft.category} onChange={(e) => change("category", e.target.value)}><option>Dairy</option><option>Produce</option><option>Bakery</option><option>Pantry</option></select>
            <label>SKU *</label>
            <input value={draft.sku} onChange={(e) => change("sku", e.target.value)} />
            <small>Unique across your product catalog.</small>
          </section>

          <section className="detail-card storefront-card">
            <div className="side-card-title"><h2>Storefront preview</h2><ExternalLink size={15} /></div>
            <img src={draft.product_image || "/mock-images/milk.svg"} alt="Storefront preview" />
            <div className="storefront-info"><strong>{draft.name}</strong><b>KES {Number(draft.price).toFixed(2)}</b><span>≈ AUD {(Number(draft.price) / 3.8).toFixed(2)}</span><span>◇ {draft.category} · {available} in stock</span></div>
            <div className="live-price"><Check size={13} /> Live price: KES {Number(draft.price).toFixed(2)} · {available} available</div>
          </section>

          <section className="detail-card recent-card">
            <h2>Recent activity</h2>
            <ul><li><b>Price updated to KES {Number(draft.price).toFixed(2)}</b><small>Today, 09:41 · Alex Morgan</small></li><li><b>Inventory received: +48 units</b><small>Yesterday, 15:20 · Alex Morgan</small></li><li><b>Published to 3 channels</b><small>Oct 11, 10:05 · Alex Morgan</small></li></ul>
            <button>View all activity →</button>
          </section>
        </aside>
      </div>

      <div className="product-detail-footer"><button className="archive-button" onClick={archiveProduct}><Archive size={14} /> Archive product</button><div><button className="detail-outline" onClick={() => setDraft({ ...FALLBACK, ...product })}>Discard changes</button><button className="detail-primary" onClick={saveChanges}>Save changes</button></div></div>
    </div>
  );
}
