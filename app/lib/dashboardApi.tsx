const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const dashboardApi = {
  /* =======================
     🌍 PUBLIC PROGRAMS
  ======================== */

  async getPrograms(filters: any = {}) {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.subCategory) params.append("subCategory", filters.subCategory);
    if (filters.location) params.append("location", filters.location);
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);

    const res = await fetch(
      `${API_BASE_URL}/programs?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch programs");
    return res.json();
  },

  async getProgram(programId: number) {
    const res = await fetch(`${API_BASE_URL}/programs/${programId}`);
    if (!res.ok) throw new Error("Failed to fetch program");
    return res.json();
  },

  async getProgramsByCategory(category: string, filters: any = {}) {
    const params = new URLSearchParams();

    if (filters.subCategory) params.append("subCategory", filters.subCategory);
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);

    const res = await fetch(
      `${API_BASE_URL}/programs/category/${category}?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch programs");
    return res.json();
  },

  /* =======================
     🏠 HOST – PROGRAMS
  ======================== */

  async createProgram(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/host/programs`, {
      method: "POST",
      headers: authHeader(),
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to create program");
    return res.json();
  },

  async getHostPrograms() {
    const res = await fetch(`${API_BASE_URL}/host/programs`, {
      headers: authHeader(),
    });

    if (!res.ok) throw new Error("Failed to fetch host programs");
    return res.json();
  },

  async updateProgram(programId: number, formData: FormData) {
    const res = await fetch(
      `${API_BASE_URL}/host/programs/${programId}`,
      {
        method: "PATCH",
        headers: authHeader(),
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Failed to update program");
    return res.json();
  },

  async deleteProgram(programId: number) {
    const res = await fetch(
      `${API_BASE_URL}/host/programs/${programId}`,
      {
        method: "DELETE",
        headers: authHeader(),
      }
    );

    if (!res.ok) throw new Error("Failed to delete program");
    return res.json();
  },

  /* =======================
     🏠 HOST – PROFILE
  ======================== */

  async getMyHostProfile() {
    const res = await fetch(`${API_BASE_URL}/host/getMyHostProfile`, {
      headers: authHeader(),
    });

    if (!res.ok) throw new Error("Failed to fetch host profile");
    return res.json();
  },

  async addHostProfile(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/host/addHostData`, {
      method: "POST",
      headers: authHeader(),
      body: formData, // propertyImages[]
    });

    if (!res.ok) throw new Error("Failed to create host profile");
    return res.json();
  },

  async updateHostProfile(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/host/editProfile`, {
      method: "PATCH",
      headers: authHeader(),
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to update host profile");
    return res.json();
  },

  /* =======================
     📄 HOST – APPLICATIONS
  ======================== */

  async getHostApplications() {
    const res = await fetch(`${API_BASE_URL}/host/seeApplications`, {
      headers: authHeader(),
    });

    if (!res.ok) throw new Error("Failed to fetch applications");
    return res.json();
  },

  async updateApplicationStatus(
    applicationId: number,
    status: "pending" | "accepted" | "rejected"
  ) {
    const res = await fetch(
      `${API_BASE_URL}/host/updateApplicationStatus/${applicationId}`,
      {
        method: "PATCH",
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) throw new Error("Failed to update application status");
    return res.json();
  },
};
