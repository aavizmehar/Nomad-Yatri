// lib/api/dashboard.api.ts
import { http } from '../http';

export const dashboardApi = {
  /* =======================
     🌍 PUBLIC PROGRAMS
  ======================== */
  getPrograms: (filters: any = {}) => {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.location) params.append('location', filters.location);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    return http(`/programs?${params.toString()}`);
  },

  getProgram: (programId: number) =>
    http(`/programs/${programId}`),

  getProgramsByCategory: (category: string, filters: any = {}) => {
    const params = new URLSearchParams();
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    return http(`/programs/category/${category}?${params.toString()}`);
  },

  /* =======================
     🏠 HOST – PROGRAMS
  ======================== */
  createProgram: (formData: FormData) =>
    http('/host/programs', { method: 'POST', body: formData }),

  getHostPrograms: () =>
    http('/host/programs'),

  updateProgram: (programId: number, formData: FormData) =>
    http(`/host/programs/${programId}`, { method: 'PATCH', body: formData }),

  deleteProgram: (programId: number) =>
    http(`/host/programs/${programId}`, { method: 'DELETE' }),

  /* =======================
     🏠 HOST – PROFILE
  ======================== */
  getMyHostProfile: () =>
    http('/host/getMyHostProfile'),

  addHostProfile: (formData: FormData) =>
    http('/host/addHostData', { method: 'POST', body: formData }),

  updateHostProfile: (formData: FormData) =>
    http('/host/editProfile', { method: 'PATCH', body: formData }),

  /* =======================
     📄 HOST – APPLICATIONS
  ======================== */
  getHostApplications: () =>
    http('/host/seeApplications'),

  updateApplicationStatus: (applicationId: number, status: 'pending' | 'accepted' | 'rejected') =>
    http(`/host/updateApplicationStatus/${applicationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: { 'Content-Type': 'application/json' },
    }),
};
