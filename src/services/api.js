// src/services/api.js
const API_URL = 'http://localhost:3001/api/v1';

/**
 * Fetch helper with authorization and error handling
 */
const fetchWithAuth = async (url, options = {}) => {
  // Get token from local storage
  const token = localStorage.getItem('token');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // Make request
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  
  // Handle non-successful responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'Something went wrong',
    }));
    throw new Error(errorData.message || 'Something went wrong');
  }
  
  // Parse JSON response or return empty object if no content
  return response.status === 204 ? {} : await response.json();
};

/**
 * Authentication Service
 */
export const authService = {
  // Register a new user
  register: async (userData) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Login user
  login: async (credentials) => {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in local storage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

/**
 * Exhibition Service
 */
export const exhibitionService = {
  // Get all exhibitions
  getAll: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `/exhibitions${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithAuth(url);
  },
  
  // Get exhibition by ID
  getById: async (id) => {
    return fetchWithAuth(`/exhibitions/${id}`);
  },
  
  // Get artworks for an exhibition
  getArtworks: async (id) => {
    return fetchWithAuth(`/exhibitions/${id}/artworks`);
  },
  
  // Create a new exhibition
  create: async (exhibition) => {
    return fetchWithAuth('/exhibitions', {
      method: 'POST',
      body: JSON.stringify(exhibition),
    });
  },
  
  // Update an exhibition
  update: async (id, exhibition) => {
    return fetchWithAuth(`/exhibitions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(exhibition),
    });
  },
  
  // Delete an exhibition
  delete: async (id) => {
    return fetchWithAuth(`/exhibitions/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Artwork Service
 */
export const artworkService = {
  // Get all artworks
  getAll: async (filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `/artworks${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithAuth(url);
  },
  
  // Get artwork by ID
  getById: async (id) => {
    return fetchWithAuth(`/artworks/${id}`);
  },
  
  // Create a new artwork
  create: async (artwork) => {
    return fetchWithAuth('/artworks', {
      method: 'POST',
      body: JSON.stringify(artwork),
    });
  },
  
  // Update an artwork
  update: async (id, artwork) => {
    return fetchWithAuth(`/artworks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artwork),
    });
  },
  
  // Delete an artwork
  delete: async (id) => {
    return fetchWithAuth(`/artworks/${id}`, {
      method: 'DELETE',
    });
  },
};