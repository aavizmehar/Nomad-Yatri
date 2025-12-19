import { http } from '../http';

export const volunteerApi = {
  getProfile: () =>
    http('/volunteer/profile'),

  saveProfile: (data: any) =>
    http('/volunteer/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  applyToProgram: (programId: number) =>
    http('/volunteer/apply', {
      method: 'POST',
      body: JSON.stringify({ programId }),
    }),

  getMyApplications: () =>
    http('/volunteer/applications'),
};
