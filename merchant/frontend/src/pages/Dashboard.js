import { MapPin, Monitor, Pencil, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import Modal from "../components/common/Modal";
import ProductCard from "../components/products/ProductCard";
import "../styles/overview.css";

export default function OverviewPage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All items");
  const [editingShop, setEditingShop] = useState(false);
  const [draft, setDraft] = useState({});

  async function loadOverview() {
    const response = await api("/merchant/overview");
    setData(response);
  }

  useEffect(() => {
    loadOverview();
  }, []);

  const products = data?.products || [];

  const categories = [
    "All items",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All items" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  function openEditShop() {
    const merchant = data.merchant;

    setDraft({
      business_name: merchant.business_name,
      category: merchant.category,
      address: merchant.address,
      banner_image: merchant.banner_image,
    });

    setEditingShop(true);
  }

  async function saveShop(event) {
    event.preventDefault();

    await api("/merchant/profile", {
      method: "PATCH",
      body: JSON.stringify(draft),
    });

    setEditingShop(false);
    await loadOverview();
  }

  if (!data) {
    return <div className="content-page">Loading shop…</div>;
  }

  const merchant = data.merchant;

  return (
    <div className="content-page">
      <div className="page-heading">
        <div>
          <h1>Shop overview</h1>
          <p>Your storefront, just as customers see it.</p>
        </div>

        <button className="outline-btn" type="button" onClick={openEditShop}>
          <Pencil size={15} />
          Edit shop
        </button>
      </div>

      <section className="store-preview">
        <div className="preview-head">
          <b>◉ Customer-view preview</b>

          <span>
            <Monitor size={14} />
            Desktop storefront
          </span>
        </div>

        <img
          className="banner"
          src={merchant.banner_image}
          alt={`${merchant.business_name} storefront`}
        />

        <div className="store-meta">
          <div>
            <h2>{merchant.business_name}</h2>

            <p>
              <MapPin size={14} />
              {merchant.address} ({merchant.distance_label})
            </p>
          </div>

          <span className="category-badge">{merchant.category}</span>
        </div>

        <div className="catalogue">
          <div className="search-wrap">
            <Search size={17} />

            <input
              placeholder="Search for items..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="chips">
            {categories.map((itemCategory) => (
              <button
                key={itemCategory}
                type="button"
                className={category === itemCategory ? "active" : ""}
                onClick={() => setCategory(itemCategory)}
              >
                {itemCategory}
              </button>
            ))}
          </div>

          <div className="items-title">
            <h3>Items:</h3>
            <span>{filteredProducts.length} items</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {editingShop && (
        <Modal title="Edit shop" onClose={() => setEditingShop(false)}>
          <form className="modal-form" onSubmit={saveShop}>
            <label>
              Business name
              <input
                value={draft.business_name || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    business_name: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Category
              <input
                value={draft.category || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    category: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Address
              <input
                value={draft.address || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Banner image URL
              <input
                value={draft.banner_image || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    banner_image: event.target.value,
                  })
                }
              />
            </label>

            <button className="primary-btn" type="submit">
              Save changes
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
