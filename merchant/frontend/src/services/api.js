import {
  DEFAULT_ANALYTICS,
  DEFAULT_MERCHANT,
  DEFAULT_ORDERS,
  DEFAULT_PRODUCTS,
  DEFAULT_USER,
  DEMO_ACCOUNT,
} from "../data/mockData";

const STORAGE_KEYS = {
  user: "merchant_mock_user",
  merchant: "merchant_mock_merchant",
  products: "merchant_mock_products",
  orders: "merchant_mock_orders",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readStorage(key, fallback) {
  const saved = localStorage.getItem(key);

  if (!saved) {
    return clone(fallback);
  }

  try {
    return JSON.parse(saved);
  } catch {
    return clone(fallback);
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function getUser() {
  return readStorage(STORAGE_KEYS.user, DEFAULT_USER);
}

function getMerchant() {
  return readStorage(STORAGE_KEYS.merchant, DEFAULT_MERCHANT);
}

function getProducts() {
  return readStorage(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
}

function getOrders() {
  return readStorage(STORAGE_KEYS.orders, DEFAULT_ORDERS);
}

function parseBody(options = {}) {
  if (!options.body) {
    return {};
  }

  if (typeof options.body === "string") {
    return JSON.parse(options.body);
  }

  return options.body;
}

function wait(milliseconds = 120) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function makeId(prefix) {
  return `${prefix}_${Date.now()}`;
}

export async function api(path, options = {}) {
  await wait();

  const method = (options.method || "GET").toUpperCase();
  const body = parseBody(options);

  // Prototype mode only: all data comes from local mock data/localStorage.
  // No network request or database connection is made here.

  if (path === "/auth/login" && method === "POST") {
    const savedUser = getUser();
    const savedPassword = localStorage.getItem("merchant_mock_password");

    const isDemoAccount =
      body.email === DEMO_ACCOUNT.email && body.password === DEMO_ACCOUNT.password;

    const isLocallyRegisteredAccount =
      savedUser.email === body.email &&
      savedPassword &&
      savedPassword === body.password;

    if (!isDemoAccount && !isLocallyRegisteredAccount) {
      throw new Error("Invalid email or password. Use the demo account shown below.");
    }

    return {
      token: "prototype-merchant-token",
      user: getUser(),
      merchant: getMerchant(),
    };
  }

  if (path === "/auth/me" && method === "GET") {
    if (!localStorage.getItem("merchant_token")) {
      throw new Error("No prototype session found.");
    }

    return {
      user: getUser(),
      merchant: getMerchant(),
    };
  }

  if (path === "/auth/register-merchant" && method === "POST") {
    const user = {
      ...clone(DEFAULT_USER),
      _id: makeId("user"),
      name: body.name,
      email: body.email,
      whatsapp_number: body.whatsapp_number,
      whatsapp_verified: false,
      country: body.country || "Kenya",
    };

    const merchant = {
      ...clone(DEFAULT_MERCHANT),
      _id: makeId("merchant"),
      business_name: body.business_name,
      business_registration_no: body.business_registration_no,
      country: body.country || "Kenya",
      category: body.category || "Groceries",
      payout_currency: body.payout_currency || "KES",
      kyb_status: "pending",
      mobile_money_account: body.mobile_money_account ||
        clone(DEFAULT_MERCHANT.mobile_money_account),
    };

    writeStorage(STORAGE_KEYS.user, user);
    writeStorage(STORAGE_KEYS.merchant, merchant);
    localStorage.setItem("merchant_mock_password", body.password);

    return {
      token: "prototype-merchant-token",
      user,
      merchant,
    };
  }

  if (path === "/auth/whatsapp/request-otp" && method === "POST") {
    return {
      message: "Prototype verification code generated.",
      devOtp: "123456",
    };
  }

  if (path === "/auth/whatsapp/verify-otp" && method === "POST") {
    if (body.code !== "123456") {
      throw new Error("Incorrect code. Use 123456 for the prototype.");
    }

    const user = writeStorage(STORAGE_KEYS.user, {
      ...getUser(),
      whatsapp_verified: true,
    });

    return {
      user,
      merchant: getMerchant(),
    };
  }

  if (path === "/auth/complete-verification" && method === "POST") {
    const merchant = writeStorage(STORAGE_KEYS.merchant, {
      ...getMerchant(),
      kyb_status: "verified",
      is_active: true,
    });

    return { merchant };
  }

  if (path === "/merchant/overview" && method === "GET") {
    return {
      merchant: getMerchant(),
      products: getProducts().filter((product) => product.is_active),
    };
  }

  if (path === "/merchant/profile" && method === "PATCH") {
    const merchant = writeStorage(STORAGE_KEYS.merchant, {
      ...getMerchant(),
      ...body,
    });

    return { merchant };
  }

  if (path === "/merchant/products" && method === "GET") {
    return { products: getProducts() };
  }

  if (path === "/merchant/products" && method === "POST") {
    const products = getProducts();
    const product = {
      ...body,
      _id: makeId("product"),
      merchant_id: getMerchant()._id,
      is_active: body.is_active !== false,
    };

    writeStorage(STORAGE_KEYS.products, [product, ...products]);
    return { product };
  }

  const productMatch = path.match(/^\/merchant\/products\/([^/]+)$/);

  if (productMatch && method === "PATCH") {
    const productId = productMatch[1];
    const products = getProducts().map((product) =>
      product._id === productId ? { ...product, ...body } : product
    );

    writeStorage(STORAGE_KEYS.products, products);
    return { product: products.find((product) => product._id === productId) };
  }

  if (productMatch && method === "DELETE") {
    const productId = productMatch[1];
    const products = getProducts().map((product) =>
      product._id === productId ? { ...product, is_active: false } : product
    );

    writeStorage(STORAGE_KEYS.products, products);
    return { success: true };
  }

  if (path === "/merchant/orders" && method === "GET") {
    return { orders: getOrders() };
  }

  const fulfillmentMatch = path.match(
    /^\/merchant\/orders\/([^/]+)\/fulfillment$/
  );

  if (fulfillmentMatch && method === "PATCH") {
    const orderId = fulfillmentMatch[1];
    const orders = getOrders().map((order) =>
      order._id === orderId
        ? {
            ...order,
            fulfillment: {
              ...(order.fulfillment || {}),
              status: body.status,
            },
          }
        : order
    );

    writeStorage(STORAGE_KEYS.orders, orders);
    return { order: orders.find((order) => order._id === orderId) };
  }

  if (path === "/merchant/analytics" && method === "GET") {
    return clone(DEFAULT_ANALYTICS);
  }

  throw new Error(`Prototype endpoint not implemented: ${method} ${path}`);
}
