const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();

// Authentication API
export const authAPI = {
  signUp: (email: string, password: string, fullName: string) =>
    apiService.post('/auth/signup', { email, password, fullName }),
  
  signIn: (email: string, password: string) =>
    apiService.post('/auth/signin', { email, password }),
  
  getProfile: () =>
    apiService.get('/auth/profile'),
  
  verifyToken: () =>
    apiService.get('/auth/verify'),
};

// Products API
export const productsAPI = {
  getAll: () =>
    apiService.get('/products'),
  
  getById: (id: string) =>
    apiService.get(`/products/${id}`),
  
  getCategories: () =>
    apiService.get('/products/categories/all'),
};

// Reviews API
export const reviewsAPI = {
  getAll: () =>
    apiService.get('/reviews'),
  
  getByProduct: (productId: string) =>
    apiService.get(`/reviews/product/${productId}`),
  
  create: (productId: string, rating: number, comment?: string) =>
    apiService.post('/reviews', { product_id: productId, rating, comment }),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) =>
    apiService.post('/orders', orderData),
  
  getMyOrders: () =>
    apiService.get('/orders/my-orders'),
  
  getById: (id: string) =>
    apiService.get(`/orders/${id}`),
};

// Homepage API
export const homepageAPI = {
  getContent: () =>
    apiService.get('/homepage/content'),
  
  getStoreInfo: () =>
    apiService.get('/homepage/store-info'),
};
