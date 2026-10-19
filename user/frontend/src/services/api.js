// API calls to the User App backend
// Based on API Contract v1.0

const API_URL = 
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || 
  'http://localhost:5000/api';

// Helper to get JWT token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid - clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
    throw new Error('UNAUTHENTICATED');
  }

  if (response.status === 403) {
    throw new Error('FORBIDDEN');
  }

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

// ==============================
// AUTH
// ==============================

export const auth = {
  register: async (formData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  verifyPin: async (whatsappNumber, pin) => {
    return authFetch('/auth/verify-pin', {
      method: 'POST',
      body: JSON.stringify({ whatsapp_number: whatsappNumber, pin }),
    });
  },

  resendPin: async (whatsappNumber) => {
    return authFetch('/auth/resend-pin', {
      method: 'POST',
      body: JSON.stringify({ whatsapp_number: whatsappNumber }),
    });
  },

  magicLogin: async (token) => {
    const response = await fetch(`${API_URL}/auth/magic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  loginRequest: async (whatsappNumber) => {
    return authFetch('/auth/login/request', {
      method: 'POST',
      body: JSON.stringify({ whatsapp_number: whatsappNumber }),
    });
  },

  loginVerify: async (whatsappNumber, pin) => {
    return authFetch('/auth/login/verify', {
      method: 'POST',
      body: JSON.stringify({ whatsapp_number: whatsappNumber, pin }),
    });
  },

  getMe: async () => {
    return authFetch('/auth/me');
  },
};

// ==============================
// USERS
// ==============================

export const users = {
  updateProfile: async (data) => {
    return authFetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  updatePhoto: async (formData) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/users/me/photo`, {
      method: 'PUT',
      headers: { ...(token && { 'Authorization': `Bearer ${token}` }) },
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },
};

// ==============================
// MERCHANTS & PRODUCTS
// ==============================

export const merchants = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return authFetch(`/merchants${queryString ? `?${queryString}` : ''}`);
  },

  get: async (merchantId) => {
    return authFetch(`/merchants/${merchantId}`);
  },

  getProducts: async (merchantId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return authFetch(`/merchants/${merchantId}/products${queryString ? `?${queryString}` : ''}`);
  },
};

export const products = {
  get: async (productId) => {
    return authFetch(`/products/${productId}`);
  },
};

// ==============================
// BASKETS
// ==============================

export const baskets = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return authFetch(`/baskets${queryString ? `?${queryString}` : ''}`);
  },

  get: async (basketId) => {
    return authFetch(`/baskets/${basketId}`);
  },

  create: async (data) => {
    return authFetch('/baskets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (basketId, data) => {
    return authFetch(`/baskets/${basketId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (basketId) => {
    return authFetch(`/baskets/${basketId}`, {
      method: 'DELETE',
    });
  },

  addItem: async (basketId, data) => {
    return authFetch(`/baskets/${basketId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateItem: async (basketId, productId, data) => {
    return authFetch(`/baskets/${basketId}/items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteItem: async (basketId, productId) => {
    return authFetch(`/baskets/${basketId}/items/${productId}`, {
      method: 'DELETE',
    });
  },

  checkout: async (basketId, data) => {
    return authFetch(`/baskets/${basketId}/checkout`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  share: async (basketId, data) => {
    return authFetch(`/baskets/${basketId}/share`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ==============================
// ORDERS
// ==============================

export const orders = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return authFetch(`/orders${queryString ? `?${queryString}` : ''}`);
  },

  get: async (orderId) => {
    return authFetch(`/orders/${orderId}`);
  },

  pay: async (orderId) => {
    return authFetch(`/orders/${orderId}/pay`, {
      method: 'POST',
    });
  },

  markReceived: async (orderId) => {
    return authFetch(`/orders/${orderId}/received`, {
      method: 'PATCH',
    });
  },

  cancel: async (orderId) => {
    return authFetch(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
  },
};

// ==============================
// PUBLIC LINKS (no auth)
// ==============================

export const publicApi = {
  getBasket: async (token) => {
    const response = await fetch(`${API_URL}/public/baskets/${token}`);
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  getPayOrder: async (token) => {
    const response = await fetch(`${API_URL}/public/pay/${token}`);
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },

  checkoutPay: async (token) => {
    const response = await fetch(`${API_URL}/public/pay/${token}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return response.json();
  },
};

// ==============================
// NOTIFICATIONS
// ==============================

export const notifications = {
  list: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return authFetch(`/notifications${queryString ? `?${queryString}` : ''}`);
  },

  markRead: async (notificationId) => {
    return authFetch(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  },

  markAllRead: async () => {
    return authFetch('/notifications/read-all', {
      method: 'PATCH',
    });
  },
};
