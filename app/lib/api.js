const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const api = {
  // Get all programs with filters
  async getPrograms(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.location) params.append('location', filters.location);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    const response = await fetch(`${API_BASE_URL}/programs?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // Get single program by ID
  async getProgram(programId) {
    const response = await fetch(`${API_BASE_URL}/programs/${programId}`);
    if (!response.ok) throw new Error('Failed to fetch program');
    return response.json();
  },

  // Get programs by category
  async getProgramsByCategory(category, filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    const response = await fetch(`${API_BASE_URL}/programs/category/${category}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // Get subcategories for a category
  async getSubcategories(category) {
    const response = await fetch(`${API_BASE_URL}/host/categories/${category}/subcategories`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch subcategories');
    return response.json();
  },

  // Create new program (host only)
  async createProgram(formData) {
    const response = await fetch(`${API_BASE_URL}/host/programs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData // FormData with images
    });
    if (!response.ok) throw new Error('Failed to create program');
    return response.json();
  },

  // Get host's programs
  async getHostPrograms() {
    const response = await fetch(`${API_BASE_URL}/host/programs`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // Update program
  async updateProgram(programId, formData) {
    const response = await fetch(`${API_BASE_URL}/host/programs/${programId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to update program');
    return response.json();
  },

  // Delete program
  async deleteProgram(programId) {
    const response = await fetch(`${API_BASE_URL}/host/programs/${programId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete program');
    return response.json();
  }
};